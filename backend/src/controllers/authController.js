const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role, UserCartoonHistory, CartoonEpisode, UserFavorite } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_owlbook_key';
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const roleName = role || 'member';
    let roleRecord = await Role.findOne({ where: { name: roleName } });
    if (!roleRecord) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      roles_id: roleRecord.id,
      coin: roleName === 'member' ? 100 : 0
    });
    const token = jwt.sign(
      { id: newUser.id, role: roleName },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, role: roleName, userId: newUser.id, coins: newUser.coin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role }]
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const roleName = user.Role ? user.Role.name : 'guest';
    const token = jwt.sign(
      { id: user.id, role: roleName },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, role: roleName, userId: user.id, coins: user.coin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
exports.verifyToken = verifyToken;
const resolveUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    next();
  }
};
exports.resolveUser = resolveUser;
const getAuthors = async (req, res) => {
  try {
    const authors = await User.findAll({
      include: [{
        model: Role,
        where: { name: ['admin', 'provider'] }
      }],
      attributes: ['id', 'email']
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAuthors = getAuthors;
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: Role },
        { 
          model: UserCartoonHistory, 
          as: 'histories',
          include: [{ model: CartoonEpisode, as: 'episode' }]
        },
        {
          model: UserFavorite,
          as: 'favorites'
        }
      ]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const roleName = user.Role ? user.Role.name : 'guest';
    const unlockedEpisodes = (user.histories || []).map(h => {
      if (h.episode) {
        return `${h.episode.cartoon_id}_${h.cartoon_ep_id}`;
      }
      return null;
    }).filter(Boolean);
    const favorites = (user.favorites || []).map(f => String(f.cartoons_id));
    res.json({ 
      userId: user.id, 
      role: roleName, 
      coins: user.coin, 
      email: user.email,
      unlockedEpisodes,
      favorites
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.toggleFavorite = async (req, res) => {
  try {
    const { cartoons_id } = req.body;
    const user_id = req.user.id;
    const existing = await UserFavorite.findOne({
      where: { user_id, cartoons_id }
    });
    if (existing) {
      await existing.destroy();
      return res.json({ status: 'removed', cartoons_id });
    } else {
      await UserFavorite.create({ user_id, cartoons_id });
      return res.json({ status: 'added', cartoons_id });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.unlockEpisode = async (req, res) => {
  try {
    const { cartoon_ep_id, price } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.coin < price) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }
    const existing = await UserCartoonHistory.findOne({
      where: { user_id: user.id, cartoon_ep_id }
    });
    if (existing) {
      return res.status(400).json({ error: 'Episode already unlocked' });
    }
    user.coin -= Number(price);
    await user.save();
    await UserCartoonHistory.create({
      user_id: user.id,
      cartoon_ep_id,
      paid_amount: price
    });
    res.json({ coins: user.coin, cartoon_ep_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateCoins = async (req, res) => {
  try {
    const { coins } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.coin = coins;
    await user.save();
    res.json({ coins: user.coin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
