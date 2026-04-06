const { Cartoon, CartoonEpisode, User, CartoonCategory } = require('../models');
const path = require('path');
const fs = require('fs');
const episodeController = require('./episodeController');
const resolveCoverImage = (id) => {
  const comicDir = path.join(__dirname, '../../uploads/comics', String(id));
  if (fs.existsSync(path.join(comicDir, 'cover.jpg'))) {
    return `/uploads/comics/${id}/cover.jpg`;
  }
  if (fs.existsSync(path.join(comicDir, 'cover.png'))) {
    return `/uploads/comics/${id}/cover.png`;
  }
  return `/uploads/comics/${id}/cover.jpg`;
};
exports.getComics = async (req, res) => {
  try {
    const isProvider = req.user && req.user.role === 'provider';
    const isManage = req.query.manage === 'true';
    const queryOptions = {
      attributes: ['id', 'name', 'description'],
      include: [
        {
          model: CartoonEpisode,
          as: 'episodes',
          order: [['number', 'ASC']]
        },
        { model: User, as: 'authors', attributes: ['email', 'id'] },
        { model: CartoonCategory, as: 'categories', attributes: ['name'] }
      ]
    };
    if (isProvider && isManage) {
      queryOptions.include[1].where = { id: req.user.id };
      queryOptions.include[1].required = true;
    }
    const comics = await Cartoon.findAll(queryOptions);
    const enrichedComics = comics.map(c => {
      const cData = c.toJSON();
      cData.image = resolveCoverImage(c.id);
      if (cData.episodes) {
        cData.episodes = cData.episodes.map(ep => {
          ep.pages = episodeController.getEpisodePages(c.id, ep.id, ep.number);
          return ep;
        });
      }
      return cData;
    });
    res.json(enrichedComics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createComic = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Only admins can create new series' });
    }
    let { name, description, authorId, tags } = req.body;
    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch { tags = tags.split(',').map(t => t.trim()); }
    }
    const comic = await Cartoon.create({
      name,
      description
    });
    if (req.file) {
      const comicDir = path.join(__dirname, '../../uploads/comics', String(comic.id));
      if (!fs.existsSync(comicDir)) fs.mkdirSync(comicDir, { recursive: true });
      const targetExt = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.join(comicDir, `cover${targetExt}`);
      ['.jpg', '.jpeg', '.png'].forEach(ext => {
        const oldFile = path.join(comicDir, `cover${ext}`);
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
      });
      fs.renameSync(req.file.path, targetPath);
    }
    if (authorId) {
      await comic.addAuthors([authorId]);
    }
    if (tags && Array.isArray(tags)) {
      for (const tagName of tags) {
        const [category] = await CartoonCategory.findOrCreate({ where: { name: tagName } });
        await comic.addCategories([category]);
      }
    }
    await comic.reload({
      include: [
        {
          model: CartoonEpisode,
          as: 'episodes',
          order: [['number', 'ASC']]
        },
        { model: User, as: 'authors', attributes: ['email'] },
        { model: CartoonCategory, as: 'categories', attributes: ['name'] }
      ]
    });
    const finalData = comic.toJSON();
    finalData.image = resolveCoverImage(finalData.id);
    res.json(finalData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateComic = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, description, tags, authorId } = req.body;
    const comic = await Cartoon.findByPk(id);
    if (!comic) return res.status(404).json({ error: 'not found' });
    if (req.user.role === 'provider') {
      const isAuthor = await comic.hasAuthor(req.user.id);
      if (!isAuthor) return res.status(403).json({ error: 'Access denied: You are not an author of this series' });
    }
    if (req.file) {
      const comicDir = path.join(__dirname, '../../uploads/comics', String(id));
      if (!fs.existsSync(comicDir)) fs.mkdirSync(comicDir, { recursive: true });
      const targetExt = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.join(comicDir, `cover${targetExt}`);
      ['.jpg', '.jpeg', '.png'].forEach(ext => {
        const oldFile = path.join(comicDir, `cover${ext}`);
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
      });
      fs.renameSync(req.file.path, targetPath);
    }
    await comic.update({
      name,
      description
    });
    if (tags) {
      if (typeof tags === 'string') {
        try { tags = JSON.parse(tags); } catch { tags = tags.split(',').map(t => t.trim()); }
      }
      if (Array.isArray(tags)) {
        await comic.setCategories([]);
        for (const tagName of tags) {
          const [category] = await CartoonCategory.findOrCreate({ where: { name: tagName } });
          await comic.addCategories([category]);
        }
      }
    }
    if (authorId && req.user.role === 'admin') {
      await comic.setAuthors([authorId]);
    }
    await comic.reload({
      include: [
        {
          model: CartoonEpisode,
          as: 'episodes',
          order: [['number', 'ASC']]
        },
        { model: User, as: 'authors', attributes: ['email'] },
        { model: CartoonCategory, as: 'categories', attributes: ['name'] }
      ]
    });
    const finalData = comic.toJSON();
    finalData.image = resolveCoverImage(finalData.id);
    res.json(finalData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteComic = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Only admins can delete series' });
    }
    const { id } = req.params;
    const comic = await Cartoon.findByPk(id);
    if (!comic) return res.status(404).json({ error: 'not found' });
    await comic.destroy();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
