/**
 * Transforma los productos del carrito al formato requerido para el pedido
 * @param {Array} cartItems - Productos en el carrito
 * @returns {Array} - Productos formateados para crear pedido
 */
export const transformCartItemsToOrderProducts = (cartItems) => {
  return cartItems.map((item) => ({
    productoId: item._id,
    cantidad: item.quantity,
  }));
};

/**
 * Crea la estructura de un nuevo pedido
 * @param {Object} params - Parámetros para crear el pedido
 * @returns {Object} - Estructura del pedido para la API
 */
export const createOrderStructure = ({
  user,
  cartItems,
  total,
  direccion, // CAMBIO: usar 'direccion' en lugar de 'shippingDetails'
  metodoPago,
}) => {
  // Formatear la dirección como string completo
  const direccionCompleta =
    typeof direccion === "string"
      ? direccion
      : `${direccion.calle}, ${direccion.ciudad}, ${direccion.departamento}, ${direccion.codigoPostal}`;

  return {
    clienteId: user._id || user.id,
    productos: transformCartItemsToOrderProducts(cartItems),
    direccionEntrega: direccionCompleta, // NUEVO CAMPO
    total: total,
  };
};
