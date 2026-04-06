const { CartoonEpisode, Cartoon, User, AuthorCartoon } = require('../models');
const fs = require('fs');
const path = require('path');
const checkOwnership = async (cartoonId, user) => {
  if (user.role === 'admin') return true;
  if (user.role !== 'provider') return false;
  const cartoon = await Cartoon.findOne({
    where: { id: cartoonId },
    include: [{
      model: User,
      as: 'authors',
      where: { id: user.id },
      required: true
    }]
  });
  return !!cartoon;
};
const getEpisodePages = (comicId, epId, epNumber) => {
  let dirPath = path.join(__dirname, `../../uploads/comics/${comicId}/episodes/${epId}`);
  let relDir = `/uploads/comics/${comicId}/episodes/${epId}`;
  if (!fs.existsSync(dirPath)) {
    dirPath = path.join(__dirname, `../../uploads/comics/${comicId}/ep${epNumber}`);
    relDir = `/uploads/comics/${comicId}/ep${epNumber}`;
  }
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  const files = fs.readdirSync(dirPath).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  return files.map((file, index) => ({
    id: `page-${index}`,
    path: `${relDir}/${file}`
  }));
};
exports.getEpisodes = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user && !(await checkOwnership(id, req.user))) {
      return res.status(403).json({ error: 'Access denied: You are not the author of this series' });
    }
    const episodes = await CartoonEpisode.findAll({ 
      where: { cartoon_id: id },
      order: [['number', 'ASC']]
    });
    const episodesWithPages = episodes.map(ep => {
      const epData = ep.toJSON();
      epData.pages = getEpisodePages(id, ep.id, ep.number);
      return epData;
    });
    res.json(episodesWithPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createEpisode = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user && !(await checkOwnership(id, req.user))) {
      return res.status(403).json({ error: 'Access denied: You are not the author of this series' });
    }
    const { number, title, price } = req.body;
    const episode = await CartoonEpisode.create({
      cartoon_id: id,
      number: number || 1,
      title: title || 'New Episode',
      price: price || 0
    });
    const epData = episode.toJSON();
    epData.pages = [];
    res.json(epData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateEpisode = async (req, res) => {
  try {
    const { id, epId } = req.params;
    if (req.user && !(await checkOwnership(id, req.user))) {
      return res.status(403).json({ error: 'Access denied: You are not the author of this series' });
    }
    const { number, title, price } = req.body;
    const episode = await CartoonEpisode.findOne({ where: { id: epId, cartoon_id: id } });
    if (!episode) return res.status(404).json({ error: 'episode not found' });
    await episode.update({ number, title, price });
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteEpisode = async (req, res) => {
  try {
    const { id, epId } = req.params;
    if (req.user && !(await checkOwnership(id, req.user))) {
      return res.status(403).json({ error: 'Access denied: You are not the author of this series' });
    }
    const episode = await CartoonEpisode.findOne({ where: { id: epId, cartoon_id: id } });
    if (!episode) return res.status(404).json({ error: 'episode not found' });
    await episode.destroy();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getEpisodePages = getEpisodePages;
