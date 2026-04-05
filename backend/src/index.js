const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const comicRoutes = require('./routes/comicRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api', comicRoutes);
app.use('/api', uploadRoutes);
app.use('/api', paymentRoutes);
app.use('/api/auth', authRoutes);
sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Database synced successfully.');
    const { Role } = require('./models');
    const rolesToSeed = ['admin', 'provider', 'member'];
    for (const roleName of rolesToSeed) {
      await Role.findOrCreate({ where: { name: roleName } });
    }
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
