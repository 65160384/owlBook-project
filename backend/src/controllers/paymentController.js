exports.createPayment = (req, res) => {
  const { amount } = req.body || {};
  const session = Date.now();
  const url = `http://localhost:5173/payment-success?session=${session}&amount=${amount || 0}`; 
  res.json({ url, session });
};
