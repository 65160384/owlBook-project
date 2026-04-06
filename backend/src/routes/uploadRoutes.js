const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const path = require('path');
const fs = require('fs');
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const generalUploadsDir = path.join(__dirname, '../../uploads/general');
  if (!fs.existsSync(generalUploadsDir)) fs.mkdirSync(generalUploadsDir, { recursive: true });
  const targetPath = path.join(generalUploadsDir, req.file.filename);
  fs.renameSync(req.file.path, targetPath);
  const relPath = '/uploads/general/' + req.file.filename;
  res.json({ path: relPath });
});
module.exports = router;
