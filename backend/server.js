const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const DB_FILE = path.join(dataDir, 'db.json');
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ userComics: [], uploads: {} }, null, 2));
}

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(obj) {
  fs.writeFileSync(DB_FILE, JSON.stringify(obj, null, 2));
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, name);
  }
});

const upload = multer({ storage });

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Simple CORS for dev
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const db = readDB();
  const relPath = '/uploads/' + req.file.filename;
  // store mapping to local file path (for demo)
  db.uploads[relPath] = relPath; // we just map to itself; front will fetch via this path
  writeDB(db);
  res.json({ path: relPath });
});

// GET user comics
app.get('/api/user-comics', (req, res) => {
  const db = readDB();
  res.json(db.userComics || []);
});

// Create comic
app.post('/api/comics', (req, res) => {
  const db = readDB();
  const item = req.body;
  item.id = 'user-' + Date.now();
  item.hidden = false;
  // ensure episodes array
  item.episodes = item.episodes || [];
  db.userComics = db.userComics || [];
  db.userComics.push(item);
  writeDB(db);
  res.json(item);
});

// Episodes: list
app.get('/api/comics/:id/episodes', (req, res) => {
  const id = req.params.id;
  const db = readDB();
  const comic = (db.userComics || []).find(c => c.id === id);
  if (!comic) return res.status(404).json({ error: 'not found' });
  res.json(comic.episodes || []);
});

// Create episode
app.post('/api/comics/:id/episodes', (req, res) => {
  const id = req.params.id;
  const db = readDB();
  const idx = (db.userComics || []).findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'comic not found' });
  const ep = req.body;
  ep.id = 'ep-' + Date.now();
  ep.pages = ep.pages || [];
  db.userComics[idx].episodes = db.userComics[idx].episodes || [];
  db.userComics[idx].episodes.push(ep);
  writeDB(db);
  res.json(ep);
});

// Upload pages for an episode (multiple files)
app.post('/api/comics/:id/episodes/:epId/pages', upload.array('files'), (req, res) => {
  const id = req.params.id;
  const epId = req.params.epId;
  const db = readDB();
  const idx = (db.userComics || []).findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'comic not found' });
  const comic = db.userComics[idx];
  comic.episodes = comic.episodes || [];
  const epIdx = comic.episodes.findIndex(e => e.id === epId);
  if (epIdx === -1) return res.status(404).json({ error: 'episode not found' });
  const ep = comic.episodes[epIdx];
  req.files.forEach((f) => {
    const rel = '/uploads/' + f.filename;
    const page = { id: 'page-' + Date.now() + '-' + Math.floor(Math.random()*1000), path: rel };
    ep.pages.push(page);
    // map upload
    const dbObj = readDB();
    dbObj.uploads[rel] = rel;
    writeDB(dbObj);
  });
  writeDB(db);
  res.json(ep.pages);
});

// Update episode (e.g., reorder pages or update metadata)
app.patch('/api/comics/:id/episodes/:epId', (req, res) => {
  const id = req.params.id;
  const epId = req.params.epId;
  const db = readDB();
  const comic = (db.userComics || []).find(c => c.id === id);
  if (!comic) return res.status(404).json({ error: 'comic not found' });
  const ep = (comic.episodes || []).find(e => e.id === epId);
  if (!ep) return res.status(404).json({ error: 'episode not found' });
  // merge
  Object.assign(ep, req.body);
  writeDB(db);
  res.json(ep);
});

// Replace page image
app.patch('/api/comics/:id/episodes/:epId/pages/:pageId', upload.single('file'), (req, res) => {
  const id = req.params.id;
  const epId = req.params.epId;
  const pageId = req.params.pageId;
  const db = readDB();
  const comic = (db.userComics || []).find(c => c.id === id);
  if (!comic) return res.status(404).json({ error: 'comic not found' });
  const ep = (comic.episodes || []).find(e => e.id === epId);
  if (!ep) return res.status(404).json({ error: 'episode not found' });
  const page = (ep.pages || []).find(p => p.id === pageId);
  if (!page) return res.status(404).json({ error: 'page not found' });
  if (!req.file) return res.status(400).json({ error: 'no file' });
  const rel = '/uploads/' + req.file.filename;
  page.path = rel;
  const dbObj = readDB();
  dbObj.uploads[rel] = rel;
  writeDB(dbObj);
  writeDB(db);
  res.json(page);
});

// Delete a page
app.delete('/api/comics/:id/episodes/:epId/pages/:pageId', (req, res) => {
  const id = req.params.id;
  const epId = req.params.epId;
  const pageId = req.params.pageId;
  const db = readDB();
  const comic = (db.userComics || []).find(c => c.id === id);
  if (!comic) return res.status(404).json({ error: 'comic not found' });
  const ep = (comic.episodes || []).find(e => e.id === epId);
  if (!ep) return res.status(404).json({ error: 'episode not found' });
  ep.pages = (ep.pages || []).filter(p => p.id !== pageId);
  writeDB(db);
  res.json({ ok: true });
});

// Update comic
app.patch('/api/comics/:id', (req, res) => {
  const id = req.params.id;
  const db = readDB();
  const idx = (db.userComics || []).findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  db.userComics[idx] = { ...db.userComics[idx], ...req.body };
  writeDB(db);
  res.json(db.userComics[idx]);
});

// Soft delete (hide)
app.delete('/api/comics/:id', (req, res) => {
  const id = req.params.id;
  const db = readDB();
  const idx = (db.userComics || []).findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  db.userComics[idx].hidden = true;
  writeDB(db);
  res.json({ ok: true });
});

// Simple payment create (demo) - returns a URL (pointing back to frontend payment-success)
app.post('/api/create-payment', (req, res) => {
  const { amount } = req.body || {};
  const session = Date.now();
  const url = `http://localhost:5173/payment-success?session=${session}&amount=${amount || 0}`; // Vite default port for dev may be 5173
  res.json({ url, session });
});

app.listen(PORT, () => {
  console.log('Backend prototype running on port', PORT);
});
