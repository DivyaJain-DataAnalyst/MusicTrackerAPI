const request = require('supertest');
const express = require('express');
const songRoutes = require('../../routes/songRoutes');
const db = require('../../db');
const app = express();
app.use(express.json());
app.use('/api/songs', songRoutes);
app.use('/api/playlists', songRoutes);

beforeAll(done => {
  db.run('DELETE FROM songs');
  db.run('DELETE FROM playlists', done);
});

describe('🎯 API Endpoint Tests', () => {
  let songId;
  let playlistId;

  it('POST /api/songs/songs → adds a new song', async () => {
    const res = await request(app).post('/api/songs/songs').send({
      title: 'Fix You',
      artist: 'Coldplay',
      genre: 'Rock'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    songId = res.body.id;
  });

  it('GET /api/songs/songs → returns all songs', async () => {
    const res = await request(app).get('/api/songs/songs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/playlists/playlists → creates playlist', async () => {
    const res = await request(app).post('/api/playlists/playlists').send({
      name: 'Evening Chill'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    playlistId = res.body.id;
  });

  it('GET /api/playlists/playlists → gets playlists', async () => {
    const res = await request(app).get('/api/playlists/playlists');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/songs/songs → fails with missing fields', async () => {
    const res = await request(app).post('/api/songs/songs').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/playlists/playlists → fails with no name', async () => {
    const res = await request(app).post('/api/playlists/playlists').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
