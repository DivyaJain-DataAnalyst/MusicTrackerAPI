const express = require('express');
const router = express.Router();

const songs = [];

router.get('/', (req, res) => {
  res.json(songs);
});

router.post('/', (req, res) => {
  // Log the raw body for debugging
  console.log('Raw Request Body:', req.rawBody);

  if (typeof req.body !== 'object' || req.body === null || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Invalid JSON object. Expected { title, artist }' });
  }

  const { title, artist } = req.body;

  if (!title || !artist) {
    return res.status(400).json({ error: 'Missing title or artist' });
  }

  const newSong = {
    title: title.trim(),
    artist: artist.trim()
  };

  songs.push(newSong);
  res.status(201).json(newSong);
});

module.exports = router;
