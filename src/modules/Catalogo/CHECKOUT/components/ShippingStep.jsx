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
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    address: e.target.value,
                  })
                }
                onBlur={validateShippingForm}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Ciudad</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={shippingDetails.city}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    city: e.target.value,
                  })
                }
                onBlur={validateShippingForm}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Departamento</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={shippingDetails.state}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    state: e.target.value,
                  })
                }
                onBlur={validateShippingForm}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Código Postal</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={shippingDetails.zipCode}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    zipCode: e.target.value,
                  })
                }
                onBlur={validateShippingForm}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <input
                type="tel"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={shippingDetails.phone}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    phone: e.target.value,
                  })
                }
                onBlur={validateShippingForm}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
