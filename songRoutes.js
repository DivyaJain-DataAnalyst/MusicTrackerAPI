const express = require('express');
const router = express.Router();

const songs = [];

// GET all songs
router.get('/', (req, res) => {
  res.status(200).json(songs);
});

// POST new song
router.post('/', (req, res) => {
  const { title, artist } = req.body;

  // Validate that both fields are provided and are strings
  if (
    typeof title !== 'string' ||
    typeof artist !== 'string' ||
    title.trim() === '' ||
    artist.trim() === ''
  ) {
    return res.status(400).json({ error: 'Both title and artist must be non-empty strings' });
  }

  const newSong = {
    title: title.trim(),
    artist: artist.trim(),
  };

  songs.push(newSong);
  res.status(201).json(newSong);  // ✅ This is what Keploy expects
});

module.exports = router;
