import { useState, useEffect, useCallback } from "react";
import { obtenerComentariosActividad, Comentario } from "@/components/services/ObtenerComentariosService";

export function useComentariosActividad(id_usuario: number | string, id_actividad: number | string) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarComentarios = useCallback(async () => {
    const userId = Number(id_usuario);
    const actividadId = Number(id_actividad);

    if (!userId || isNaN(userId) || !actividadId || isNaN(actividadId)) {
      setError("Parámetros inválidos para obtener comentarios.");
      setComentarios([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const comentariosData = await obtenerComentariosActividad(userId, actividadId);
      setComentarios(comentariosData);
    } catch (e) {
      console.error("Error en hook useComentariosActividad:", e);
      setError("Error al cargar los comentarios.");
      setComentarios([]);
    } finally {
      setLoading(false);
    }
  }, [id_usuario, id_actividad]);

  useEffect(() => {
    cargarComentarios();
  }, [cargarComentarios]);

  return { comentarios, loading, error, cargarComentarios };
}
