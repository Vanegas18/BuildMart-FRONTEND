export const postFetch = async (endpoint, data, options = {}) => {
  const { fetchOptions = {} } = options;

  const url = `https://buildmart-backend.onrender.com/${endpoint}`;

  const defaultOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
