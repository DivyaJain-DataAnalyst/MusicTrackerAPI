const express = require('express');
const router = express.Router();

const songs = [];

router.post('/', (req, res) => {
  const { title, artist } = req.body;

  // Basic input validation
  if (!title || !artist) {
    return res.status(400).json({ error: 'Missing title or artist' });
  }

  // Reject potentially dangerous input
  const forbiddenPatterns = [/<script.*?>.*?<\/script>/gi, /['";--]/g];

  if (forbiddenPatterns.some(pattern => pattern.test(title) || pattern.test(artist))) {
    return res.status(400).json({ error: 'Invalid characters in input' });
  }

  if (title.length > 100 || artist.length > 100) {
    return res.status(400).json({ error: 'Title or artist too long' });
  }

  const newSong = {
    title: title.trim(),
    artist: artist.trim()
  };

  songs.push(newSong);
  res.status(201).json(newSong);
});
