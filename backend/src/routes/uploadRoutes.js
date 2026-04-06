const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const path = require('path');
const fs = require('fs').promises;

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    
    const generalUploadsDir = path.join(__dirname, '../../uploads/general');
    await fs.mkdir(generalUploadsDir, { recursive: true });
    
    const targetPath = path.join(generalUploadsDir, req.file.filename);
    await fs.rename(req.file.path, targetPath);
    
    const relPath = '/uploads/general/' + req.file.filename;
    res.json({ path: relPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
