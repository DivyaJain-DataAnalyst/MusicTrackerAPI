const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
router.get('/songs', songController.getSongs);
router.post('/songs', songController.addSong);
router.post('/songs', handler);  // Duplicate the same logic for direct `/songs` route
router.post('/', handler);       // For /api/songs
router.get('/playlists', songController.getPlaylists);
router.post('/playlists', songController.createPlaylist);

module.exports = router;
