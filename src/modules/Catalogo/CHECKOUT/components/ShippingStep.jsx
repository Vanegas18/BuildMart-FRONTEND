import { useState } from "react";

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
    <div className="space-y-4">
      <h3 className="font-medium">Información de Envío</h3>

      {/* Mostrar direcciones guardadas */}
      {direccionesGuardadas.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Direcciones Guardadas
          </h4>
          <div className="space-y-2">
            {direccionesGuardadas.map((direccion) => (
              <div
                key={direccion._id}
                className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
                  direccionSeleccionada?._id === direccion._id
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => handleSeleccionarDireccion(direccion)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        direccionSeleccionada?._id === direccion._id
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}>
                      {direccionSeleccionada?._id === direccion._id && (
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {direccion.tipo}
                        {direccion.esPrincipal && (
                          <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full">
                            Principal
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {direccion.calle}, {direccion.ciudad},{" "}
                        {direccion.departamento}
                        {direccion.codigoPostal &&
                          ` - ${direccion.codigoPostal}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Opción para agregar nueva dirección */}
            <div
              className={`p-3 border rounded-md cursor-pointer hover:border-blue-500 ${
                creandoNuevaDireccion ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={handleNuevaDireccion}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    creandoNuevaDireccion
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}>
                  {creandoNuevaDireccion && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="font-medium text-blue-600">
                  Agregar nueva dirección de envío
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario para nueva dirección */}
      {(creandoNuevaDireccion || direccionesGuardadas.length === 0) && (
        <div className={`${direccionesGuardadas.length > 0 ? "mt-4" : ""}`}>
          {direccionesGuardadas.length > 0 && (
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Nueva Dirección
            </h4>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium">Dirección</label>
              <input
                type="text"
                className={`w-full mt-1 px-3 py-2 border rounded-md ${
                  errors.address ? "border-red-500" : ""
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
            <div>
              <label className="text-sm font-medium">Ciudad</label>
              <input
                type="text"
                className={`w-full mt-1 px-3 py-2 border rounded-md ${
                  errors.city ? "border-red-500" : ""
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
            <div>
              <label className="text-sm font-medium">Departamento</label>
              <input
                type="text"
                className={`w-full mt-1 px-3 py-2 border rounded-md ${
                  errors.state ? "border-red-500" : ""
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
            <div>
              <label className="text-sm font-medium">Código Postal</label>
              <input
                type="text"
                className={`w-full mt-1 px-3 py-2 border rounded-md ${
                  errors.zipCode ? "border-red-500" : ""
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
            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <input
                type="tel"
                className={`w-full mt-1 px-3 py-2 border rounded-md ${
                  errors.phone ? "border-red-500" : ""
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
      )}
    </div>
  );
};
