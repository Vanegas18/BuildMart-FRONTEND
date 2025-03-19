export const login = async (correo, contraseña) => {
  const response = await fetch(
    "https://buildmart-backend-production.up.railway.app/usuarios/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contraseña }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  const data = await response.json();
  return data;
};

export const isAuthenticated = () => {
  return document.cookie.includes("token");
};
