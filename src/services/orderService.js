module.exports = {
  calculateTotal: (items, tax = 0) => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return Math.round(subtotal * (1 + tax) * 100) / 100;
  },

  create: async (orderData) => {
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error("Order must have at least 1 item");
    }
    return { id: 1, status: "PENDING", items: orderData.items };
  },

  applyCoupon: (total, code) => {
    if (code === "SAVE10") return Math.round(total * 0.9 * 100) / 100;
    return total;
  },
};
