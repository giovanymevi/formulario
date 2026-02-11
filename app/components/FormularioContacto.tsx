'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function FormularioContacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });
    
    const [enviando, setEnviando] = useState(false);
    const [mensajeExito, setMensajeExito] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEnviando(true);
        setMensajeError('');
        setMensajeExito('');

        try {
            // Validar campos requeridos
            if (!formData.nombre || !formData.email || !formData.mensaje) {
                throw new Error('Por favor completa todos los campos requeridos');
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error('Por favor ingresa un email válido');
            }

            // Insertar en Supabase
            const { error } = await supabase
                .from('formulario_contacto')
                .insert([
                    {
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: formData.telefono || null,
                        mensaje: formData.mensaje
                    }
                ]);

            if (error) throw error;

            // Éxito
            setMensajeExito('¡Formulario enviado correctamente! Nos pondremos en contacto pronto.');
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                mensaje: ''
            });
            
        } catch (error) {
            console.error('Error:', error);
            setMensajeError(error instanceof Error ? error.message : 'Error al enviar el formulario. Por favor intenta de nuevo.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="formulario-container">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                Formulario de Contacto
            </h2>
            
            {mensajeExito && (
                <div className="mensaje-exito">
                    {mensajeExito}
                </div>
            )}
            
            {mensajeError && (
                <div className="mensaje-error">
                    {mensajeError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="campo-formulario">
                    <label htmlFor="nombre" className="block">
                        Nombre completo *
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre completo"
                        disabled={enviando}
                    />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="email" className="block">
                        Correo electrónico *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tucorreo@ejemplo.com"
                        disabled={enviando}
                    />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="telefono" className="block">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+52 123 456 7890"
                        disabled={enviando}
                    />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="mensaje" className="block">
                        Mensaje *
                    </label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Escribe tu mensaje aquí..."
                        disabled={enviando}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={enviando}
                    className="w-full p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors"
                >
                    {enviando ? 'Enviando...' : 'Enviar mensaje'}
                </button>
            </form>
        </div>
    );
}
