export const postFetch = async (endpoint, data, options = {}) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzQyMjcyNDg0LCJleHAiOjE3NDIyNzYwODR9.OmisTSd8iKIh3-yioe9hpdPXz2QR-GOIFByZJqIw07U";

  const { fetchOptions = {} } = options;

  const url = `https://buildmart-backend-production.up.railway.app/${endpoint}`;

  const defaultOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Token de desarrollo
    },
    body: JSON.stringify(data),
    credentials: "include"
  };

  // Combinar opciones predeterminadas con las opciones proporcionadas
  const mergedOptions = { ...defaultOptions, ...fetchOptions };

  try {
    const resp = await fetch(url, mergedOptions);

    // Captura el texto de la respuesta primero
    const responseText = await resp.text();
    console.log("Respuesta completa:", responseText);

    if (!resp.ok) {
      throw new Error(`Error HTTP: ${resp.status}`);
    }

    // Convertir a JSON solo si la respuesta no está vacía
    const respData = responseText ? JSON.parse(responseText) : {};

    // Invalidar caché después de crear un nuevo producto
    if (endpoint.includes("productos")) {
      invalidateCache("productos");
    }

    return respData;
  } catch (error) {
    console.error(`Error en la petición POST a ${endpoint}:`, error);
    throw error;
  }
};
