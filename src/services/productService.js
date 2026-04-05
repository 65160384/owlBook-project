const products = [
  { id: 1, name: "Laptop Pro", price: 1000 },
  { id: 2, name: "Budget Laptop", price: 300 },
  { id: 3, name: "Smartphone", price: 500 },
];

module.exports = {
  getAllProducts: async () => products,

  search: async (q) =>
    products.filter((p) => p.name.toLowerCase().includes((q || "").toLowerCase())),

  filterByPrice: async (min, max) => products.filter((p) => p.price >= min && p.price <= max),

  calculateDiscount: (price, percent) => Math.round((price * (1 - percent / 100)) * 100) / 100,

  getById: async (id) => products.find((p) => p.id === id),
};
