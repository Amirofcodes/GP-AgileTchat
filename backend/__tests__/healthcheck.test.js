const request = require('supertest');
const app = require('../src/app');  // L'import du fichier app.js

describe('GET /health', () => {
  it('should return healthy status if database is connected', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.database).toBe('connected');
  });

  it('should return unhealthy status if database is not connected', async () => {
    // Simule une déconnexion ou erreur de la base de données
    jest.spyOn(pool, 'getConnection').mockRejectedValueOnce(new Error('Database disconnected'));
    const response = await request(app).get('/health');
    expect(response.status).toBe(500);
    expect(response.body.status).toBe('unhealthy');
    expect(response.body.database).toBe('disconnected');
  });
});

