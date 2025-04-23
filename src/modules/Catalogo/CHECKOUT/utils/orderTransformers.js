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
  shippingDetails,
  paymentMethod,
}) => {
  return {
    clienteId: user._id || user.id,
    productos: transformCartItemsToOrderProducts(cartItems),
    // direccion: {
    //   calle: shippingDetails.address,
    //   ciudad: shippingDetails.city,
    //   estado: shippingDetails.state,
    //   codigoPostal: shippingDetails.zipCode,
    //   telefono: shippingDetails.phone,
    // },
    // metodoPago: paymentMethod,
    total: total,
  };
};
