const request = require('supertest');
const express = require('express');
const db = require('../../db');
const songRoutes = require('../../routes/songRoutes');

const app = express();
app.use(express.json());
app.use('/api/songs', songRoutes);
app.use('/api/playlists', songRoutes);

beforeAll(done => {
  db.run('DELETE FROM songs');
  db.run('DELETE FROM playlists', done);
});
describe('🎵 API Integration Tests', () => {
  let songId;
  let playlistId;

  test('POST /api/songs/songs → should add a song', async () => {
    const res = await request(app).post('/api/songs/songs').send({
      title: 'Test Song',
      artist: 'Test Artist',
      genre: 'Pop'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Song');
    songId = res.body.id;
  });

  test('GET /api/songs/songs → should return all songs', async () => {
    const res = await request(app).get('/api/songs/songs');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /api/playlists/playlists → should create a playlist', async () => {
    const res = await request(app).post('/api/playlists/playlists').send({
      name: 'My Playlist'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('My Playlist');
    playlistId = res.body.id;
  });

  test('GET /api/playlists/playlists → should return playlists', async () => {
    const res = await request(app).get('/api/playlists/playlists');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
