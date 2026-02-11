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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensajeError('');
        setMensajeExito('');

        try {
            // Validar campos requeridos
            if (!formData.nombre || !formData.email || !formData.mensaje) {
                throw new Error('Por favor completa todos los campos requeridos');
            }

            // Insertar en Supabase
            const { data, error } = await supabase
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
            setMensajeError(error.message || 'Error al enviar el formulario. Por favor intenta de nuevo.');
            console.error('Error:', error);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="formulario-container">
            <h2>Formulario de Contacto</h2>
            
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

            <form onSubmit={handleSubmit}>
                <div className="campo-formulario">
                    <label htmlFor="nombre">
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
                    <label htmlFor="email">
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
                    <label htmlFor="telefono">
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
                    <label htmlFor="mensaje">
                        Mensaje *
                    </label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="Escribe tu mensaje aquí..."
                        disabled={enviando}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={enviando}
                    className="boton-enviar"
                >
                    {enviando ? 'Enviando...' : 'Enviar mensaje'}
                </button>
            </form>

            <style jsx>{`
                .formulario-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }

                h2 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 30px;
                }

                .campo-formulario {
                    margin-bottom: 20px;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #555;
                }

                input, textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    transition: border-color 0.3s;
                }

                input:focus, textarea:focus {
                    outline: none;
                    border-color: #007bff;
                }

                input:disabled, textarea:disabled {
                    background-color: #f5f5f5;
                    cursor: not-allowed;
                }

                .boton-enviar {
                    width: 100%;
                    padding: 12px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .boton-enviar:hover:not(:disabled) {
                    background-color: #0056b3;
                }

                .boton-enviar:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                }

                .mensaje-exito {
                    padding: 15px;
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                    border-radius: 4px;
                    margin-bottom: 20px;
                }

                .mensaje-error {
                    padding: 15px;
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                    border-radius: 4px;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}