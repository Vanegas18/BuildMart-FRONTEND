export const getOrders = () => {
  return [
    {
      id: "ORD-7352",
      date: "12/03/2023",
      items: [
        { name: "Panel Solar 400W", quantity: 2, price: "$500" },
        { name: "Kit Instalación", quantity: 1, price: "$240" },
      ],
      total: "$1,240",
      status: "Entregado",
      address: "Calle Principal 123, Madrid",
      tracking: "SP12345678",
    },
    {
      id: "ORD-7351",
      date: "28/02/2023",
      items: [
        {
          name: "Ventana PVC Doble Acristalamiento",
          quantity: 2,
          price: "$400",
        },
        { name: "Sellador Silicona", quantity: 1, price: "$90" },
      ],
      total: "$890",
      status: "En camino",
      address: "Calle Principal 123, Madrid",
      tracking: "SP87654321",
    },
    {
      id: "ORD-7350",
      date: "15/02/2023",
      items: [
        { name: "Kit Baño Completo", quantity: 1, price: "$980" },
        { name: "Grifería Premium", quantity: 1, price: "$450" },
        { name: "Espejo LED", quantity: 1, price: "$320" },
        { name: "Accesorios Baño", quantity: 1, price: "$120" },
        { name: "Toallero Eléctrico", quantity: 1, price: "$600" },
      ],
      total: "$2,470",
      status: "Procesando",
      address: "Calle Principal 123, Madrid",
      tracking: "Pendiente",
    },
    {
      id: "ORD-7349",
      date: "05/02/2023",
      items: [
        { name: "Pintura Interior 20L", quantity: 1, price: "$180" },
        { name: "Kit Rodillos y Brochas", quantity: 1, price: "$45" },
        { name: "Cinta de Pintor", quantity: 3, price: "$15" },
      ],
      total: "$270",
      status: "Entregado",
      address: "Calle Principal 123, Madrid",
      tracking: "SP11223344",
    },
  ];
};
