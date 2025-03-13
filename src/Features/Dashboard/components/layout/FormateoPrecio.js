export const FormateoPrecio = (price) => {
  return new Intl.NumberFormat("es-ES", {
    style: "decimal",
    maximumFractionDigits: 0, // Sin decimales
    minimumFractionDigits: 0,
  }).format(price);
};
