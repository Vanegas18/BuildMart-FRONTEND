export const ShippingStep = ({
  shippingDetails,
  setShippingDetails,
  validateShippingForm,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Información de Envío</h3>
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
          <label className="text-sm font-medium">Estado/Provincia</label>
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
  );
};
