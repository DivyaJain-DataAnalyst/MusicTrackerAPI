const songController = require('../../controllers/songController');
const db = require('../../db');
jest.mock('../../db'); 
afterEach(() => jest.clearAllMocks());
describe('addSong', () => {
  test('❌ should return 400 if fields are missing', () => {
    const req = { body: { title: '', artist: '', genre: '' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    songController.addSong(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing song fields' });
  });

  test('✅ should insert song and return 201 if data is valid', () => {
    const req = { body: { title: 'Believer', artist: 'Imagine Dragons', genre: 'Rock' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    db.run.mockImplementation((sql, params, cb) => {
      cb.call({ lastID: 1 }, null); 
    });

    songController.addSong(req, res);

    expect(db.run).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: 'Believer',
      artist: 'Imagine Dragons',
      genre: 'Rock'
    });
  });
});

describe('getSongs', () => {
  test('✅ should return list of songs', () => {
    const mockSongs = [{ id: 1, title: 'Test Song', artist: 'Test Artist', genre: 'Pop' }];
    db.all.mockImplementation((sql, cb) => cb(null, mockSongs));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    songController.getSongs(req, res);

    expect(res.json).toHaveBeenCalledWith(mockSongs);
  });

  test('❌ should return 500 if DB fails', () => {
    db.all.mockImplementation((sql, cb) => cb(new Error('DB error'), null));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    songController.getSongs(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
  });
});

describe('getPlaylists', () => {
  test('✅ should return playlists', () => {
    const mockPlaylists = [{ id: 1, name: 'Workout' }];
    db.all.mockImplementation((sql, cb) => cb(null, mockPlaylists));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    songController.getPlaylists(req, res);

    expect(res.json).toHaveBeenCalledWith(mockPlaylists);
  });

  test('❌ should return 500 if DB error', () => {
    db.all.mockImplementation((sql, cb) => cb(new Error('DB error'), null));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    songController.getPlaylists(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
  });
});

describe('createPlaylist', () => {
  test('❌ should return 400 if name is missing', () => {
    const req = { body: {} };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    songController.createPlaylist(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Playlist name is required' });
  });

  test('✅ should create playlist and return 201', () => {
    const req = { body: { name: 'Chill Vibes' } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    db.run.mockImplementation((sql, params, cb) => {
      cb.call({ lastID: 2 }, null); 
    });

    songController.createPlaylist(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 2, name: 'Chill Vibes' });
  });
});
