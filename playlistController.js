const db = require('./db');

const getPlaylists = (req, res) => {
  db.all('SELECT * FROM playlists', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

const createPlaylist = (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: 'Missing playlist name' });

  db.run('INSERT INTO playlists (name) VALUES (?)', [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name });
  });
};

module.exports = { getPlaylists, createPlaylist };  // ✅ MUST BE CORRECT
