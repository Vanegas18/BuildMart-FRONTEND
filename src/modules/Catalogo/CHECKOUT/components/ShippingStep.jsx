import { useState } from "react";
import { MapPin, Plus } from "lucide-react";

export const ShippingStep = ({
  shippingDetails,
  setShippingDetails,
  validateShippingForm,
  direccionesGuardadas = [],
  direccionSeleccionada,
  handleSeleccionarDireccion,
  creandoNuevaDireccion,
  handleNuevaDireccion,
}) => {
  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  // Función para validar el formulario completo
  const validateForm = () => {
    const newErrors = {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    };

    let isValid = true;

    // Validación de dirección
    if (!shippingDetails.address.trim()) {
      newErrors.address = "La dirección es obligatoria";
      isValid = false;
    } else if (shippingDetails.address.length < 5) {
      newErrors.address = "La dirección debe tener al menos 5 caracteres";
      isValid = false;
    }

    // Validación de ciudad
    if (!shippingDetails.city.trim()) {
      newErrors.city = "La ciudad es obligatoria";
      isValid = false;
    }

    // Validación de departamento
    if (!shippingDetails.state.trim()) {
      newErrors.state = "El departamento es obligatorio";
      isValid = false;
    }

    // Validación de código postal
    if (shippingDetails.zipCode.trim()) {
      // Si se proporciona un código postal, validar que sea numérico
      if (!/^\d{5}$/.test(shippingDetails.zipCode)) {
        newErrors.zipCode = "El código postal debe tener 5 dígitos";
        isValid = false;
      }
    }

    // Validación de teléfono
    if (!shippingDetails.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
      isValid = false;
    } else if (
      !/^[0-9]{8,10}$/.test(shippingDetails.phone.replace(/\s+/g, ""))
    ) {
      newErrors.phone = "Ingrese un número de teléfono válido (8-10 dígitos)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejador para validar campo individual
  const handleValidateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "address":
        if (!shippingDetails.address.trim()) {
          newErrors.address = "La dirección es obligatoria";
        } else if (shippingDetails.address.length < 5) {
          newErrors.address = "La dirección debe tener al menos 5 caracteres";
        } else {
          newErrors.address = "";
        }
        break;

      case "city":
        if (!shippingDetails.city.trim()) {
          newErrors.city = "La ciudad es obligatoria";
        } else {
          newErrors.city = "";
        }
        break;

      case "state":
        if (!shippingDetails.state.trim()) {
          newErrors.state = "El departamento es obligatorio";
        } else {
          newErrors.state = "";
        }
        break;

      case "zipCode":
        if (
          shippingDetails.zipCode.trim() &&
          !/^\d{5}$/.test(shippingDetails.zipCode)
        ) {
          newErrors.zipCode = "El código postal debe tener 5 dígitos";
        } else {
          newErrors.zipCode = "";
        }
        break;

      case "phone":
        if (!shippingDetails.phone.trim()) {
          newErrors.phone = "El teléfono es obligatorio";
        } else if (
          !/^[0-9]{8,10}$/.test(shippingDetails.phone.replace(/\s+/g, ""))
        ) {
          newErrors.phone =
            "Ingrese un número de teléfono válido (8-10 dígitos)";
        } else {
          newErrors.phone = "";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Combinar las validaciones internas con la validación externa
  const handleBlur = (field) => {
    handleValidateField(field);
    if (validateShippingForm) {
      validateShippingForm();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="font-medium text-lg sm:text-xl">Información de Envío</h3>

      {/* Mostrar direcciones guardadas */}
      {direccionesGuardadas.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm sm:text-base font-medium text-gray-700">
            Direcciones Guardadas
          </h4>

          <div className="space-y-3">
            {direccionesGuardadas.map((direccion) => (
              <div
                key={direccion._id}
                className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-sm ${
                  direccionSeleccionada?._id === direccion._id
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200"
                }`}
                onClick={() => handleSeleccionarDireccion(direccion)}>
                <div className="flex items-start gap-3">
                  {/* Radio Button */}
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      direccionSeleccionada?._id === direccion._id
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}>
                    {direccionSeleccionada?._id === direccion._id && (
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
                    )}
                  </div>

                  {/* Contenido de la dirección */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <span className="font-medium text-gray-800 text-sm sm:text-base">
                        {direccion.tipo}
                      </span>
                      {direccion.esPrincipal && (
                        <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full w-fit">
                          Principal
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 break-words">
                        <MapPin className="inline h-3 w-3 mr-1 text-gray-400" />
                        {direccion.calle}
                      </p>
                      <p className="text-sm text-gray-600">
                        {direccion.ciudad}, {direccion.departamento}
                        {direccion.codigoPostal &&
                          ` - ${direccion.codigoPostal}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Opción para agregar nueva dirección */}
            <div
              className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-sm ${
                creandoNuevaDireccion
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-200 border-dashed"
              }`}
              onClick={handleNuevaDireccion}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    creandoNuevaDireccion
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}>
                  {creandoNuevaDireccion ? (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
                  ) : (
                    <Plus className="h-3 w-3 text-gray-400" />
                  )}
                </div>
                <div className="font-medium text-blue-600 text-sm sm:text-base">
                  Agregar nueva dirección de envío
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario para nueva dirección */}
      {(creandoNuevaDireccion || direccionesGuardadas.length === 0) && (
        <div className={`${direccionesGuardadas.length > 0 ? "mt-6" : ""}`}>
          {direccionesGuardadas.length > 0 && (
            <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-4">
              Nueva Dirección
            </h4>
          )}

          <div className="space-y-4">
            {/* Dirección - Campo completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Calle 123 #45-67, Apto 8B"
                className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    address: e.target.value,
                  })
                }
                onBlur={() => handleBlur("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* Grid responsivo para los demás campos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ciudad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Medellín"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  value={shippingDetails.city}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      city: e.target.value,
                    })
                  }
                  onBlur={() => handleBlur("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              {/* Departamento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Antioquia"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                  value={shippingDetails.state}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      state: e.target.value,
                    })
                  }
                  onBlur={() => handleBlur("state")}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              {/* Código Postal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal{" "}
                  <span className="text-gray-400">(Opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="12345"
                  maxLength="5"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  }`}
                  value={shippingDetails.zipCode}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      zipCode: e.target.value.replace(/[^\d]/g, "").slice(0, 5),
                    })
                  }
                  onBlur={() => handleBlur("zipCode")}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="3001234567"
                  maxLength="10"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  value={shippingDetails.phone}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      phone: e.target.value.replace(/[^\d]/g, "").slice(0, 10),
                    })
                  }
                  onBlur={() => handleBlur("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
