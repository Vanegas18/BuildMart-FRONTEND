/**
 * Valida que todos los campos requeridos tengan valor
 * @param {Object} formData - Datos del formulario
 * @param {Array} requiredFields - Campos requeridos
 * @returns {Boolean} - Resultado de la validación
 */
export const validateRequiredFields = (formData, requiredFields) => {
  return requiredFields.every((field) => formData[field]?.trim());
};
