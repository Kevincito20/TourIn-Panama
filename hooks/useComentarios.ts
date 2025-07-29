import { useState, useEffect } from "react";
import { obtenerComentariosActividad, Comentario } from "@/components/services/ObtenerComentariosService";


export function useComentariosActividad(id_usuario: number | string, id_actividad: number | string) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = Number(id_usuario);
    const actividadId = Number(id_actividad);

    // Validación de parámetros
    if (!userId || isNaN(userId) || !actividadId || isNaN(actividadId)) {
      setError("Parámetros inválidos para obtener comentarios.");
      return;
    }

    const fetchComentarios = async () => {
      setLoading(true);
      setError(null);
      try {
        const comentariosData = await obtenerComentariosActividad(userId, actividadId);
        setComentarios(comentariosData);
      } catch (e) {
        console.error("Error en hook useComentariosActividad:", e);
        setError("Error al cargar los comentarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchComentarios();
  }, [id_usuario, id_actividad]);

  return { comentarios, loading, error };
}
