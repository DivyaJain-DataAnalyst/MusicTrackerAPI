const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

console.log('✅ server.js is starting...');

app.use(cors());
app.use(express.json());
const songRoutes = require('./routes/songRoutes');
app.use('/api/songs', songRoutes);
app.use('/api/playlists', songRoutes);  
app.get('/', (req, res) => {
  res.send('🎵 Music Tracker API is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
