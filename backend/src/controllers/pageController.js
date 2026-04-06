const fs = require('fs');
const path = require('path');
const { getEpisodePages } = require('./episodeController');
exports.uploadPages = (req, res) => {
  try {
    const { id, epId } = req.params;
    const epDir = path.join(__dirname, `../../uploads/comics/${id}/episodes/${epId}`);
    if (!fs.existsSync(epDir)) {
      fs.mkdirSync(epDir, { recursive: true });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    req.files.forEach(file => {
      const targetPath = path.join(epDir, file.filename);
      fs.renameSync(file.path, targetPath);
    });
    const pages = getEpisodePages(id, epId);
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.replacePage = (req, res) => {
  try {
    const { id, epId, pageId } = req.params;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const epDir = path.join(__dirname, `../../uploads/comics/${id}/episodes/${epId}`);
    if (!fs.existsSync(epDir)) fs.mkdirSync(epDir, { recursive: true });
    const pages = getEpisodePages(id, epId);
    const targetPage = pages.find(p => p.id === pageId);
    if (targetPage) {
      const oldFileName = path.basename(targetPage.path);
      const oldFilePath = path.join(epDir, oldFileName);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }
    const targetPath = path.join(epDir, req.file.filename);
    fs.renameSync(req.file.path, targetPath);
    res.json(getEpisodePages(id, epId));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deletePage = (req, res) => {
  try {
    const { id, epId, pageId } = req.params;
    const epDir = path.join(__dirname, `../../uploads/comics/${id}/episodes/${epId}`);
    const pages = getEpisodePages(id, epId);
    const targetPage = pages.find(p => p.id === pageId);
    if (!targetPage) return res.status(404).json({ error: 'Page not found' });
    const fileName = path.basename(targetPage.path);
    const filePath = path.join(epDir, fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
