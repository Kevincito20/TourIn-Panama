import { useState } from "react";
import {
  CrearComentarioPayload,
  crearComentarioActividad,
} from "@/components/services/CrearComentarioService";

export function useCrearComentario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const crearComentario = async (
    payload: CrearComentarioPayload
  ): Promise<{ success: boolean }> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await crearComentarioActividad(payload);

      if (response.success) {
        setSuccess(true);
        return { success: true };
      } else {
        setError(response.mensaje || "Error desconocido al crear el comentario.");
        return { success: false };
      }
    } catch (err) {
      console.error("Error desde hook:", err);
      setError((err as Error).message || "Error inesperado al crear el comentario.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    crearComentario,
    loading,
    error,
    success,
  };
}
