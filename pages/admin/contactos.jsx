import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminContactos() {
    const [contactos, setContactos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetchContactos();
    }, []);

    const fetchContactos = async () => {
        try {
            const { data, error } = await supabase
                .from('formulario_contacto')
                .select('*')
                .order('fecha_creacion', { ascending: false });

            if (error) throw error;
            setContactos(data);
        } catch (error) {
            console.error('Error al cargar contactos:', error);
        } finally {
            setCargando(false);
        }
    };

    const marcarComoLeido = async (id) => {
        try {
            const { error } = await supabase
                .from('formulario_contacto')
                .update({ leido: true })
                .eq('id', id);

            if (error) throw error;
            fetchContactos();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    if (cargando) return <div>Cargando...</div>;

    return (
        <div className="admin-container">
            <h1>Mensajes de Contacto</h1>
            <div className="contactos-grid">
                {contactos.map(contacto => (
                    <div key={contacto.id} className={`contacto-card ${contacto.leido ? 'leido' : 'no-leido'}`}>
                        <div className="contacto-header">
                            <h3>{contacto.nombre}</h3>
                            <span className="fecha">
                                {new Date(contacto.fecha_creacion).toLocaleDateString()}
                            </span>
                        </div>
                        <p><strong>Email:</strong> {contacto.email}</p>
                        {contacto.telefono && <p><strong>Teléfono:</strong> {contacto.telefono}</p>}
                        <p><strong>Mensaje:</strong> {contacto.mensaje}</p>
                        {!contacto.leido && (
                            <button onClick={() => marcarComoLeido(contacto.id)}>
                                Marcar como leído
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}