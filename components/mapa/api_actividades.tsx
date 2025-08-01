//Listo
export const fetchActividades = async () => {
  try {
    const response = await fetch("https://apitourinpanama.onrender.com/actividad/get");
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
