// Cache para almacenar respuestas y evitar peticiones duplicadas
const cache = new Map();

export const getFetch = async (endpoint, options = {}) => {
  const {
    useCache = false,
    cacheTTL = 5 * 60 * 1000, // 5 minutos por defecto
    fetchOptions = {},
  } = options;

  const url = `https://buildmart-backend.onrender.com//${endpoint}`;

  // Verificar si existe en caché y está vigente
  if (useCache && cache.has(endpoint)) {
    const cachedData = cache.get(endpoint);
    if (Date.now() < cachedData.expiry) {
      return cachedData.data;
    }
    // Si expiró, eliminar del caché
    cache.delete(endpoint);
  }

  try {
    const resp = await fetch(url, fetchOptions);

    if (!resp.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await resp.json();

    // Guardar en caché si está habilitado
    if (useCache) {
      cache.set(endpoint, {
        data,
        expiry: Date.now() + cacheTTL,
      });
    }

    return data;
  } catch (error) {
    console.error(`Error en la petición a ${endpoint}:`, error);
    throw error;
  }
};

// Limpia todos los datos almacenados en caché
export const clearCache = () => {
  cache.clear();
};

// Elimina un endpoint específico del caché
export const invalidateCache = (endpoint) => {
  if (cache.has(endpoint)) {
    cache.delete(endpoint);
  }
};
