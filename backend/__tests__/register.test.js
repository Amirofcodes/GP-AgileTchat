const request = require('supertest');
const app = require('../src/app');
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',          // Paramètre d'hôte (docker-compose service name)
  user: process.env.DB_USER || 'user',        // Utilisateur
  password: process.env.DB_PASSWORD || 'password', // Mot de passe
  database: process.env.DB_NAME || 'chat_db', // Nom de la base de données
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
 });

describe('POST /api/register', () => {
  it('should register a new user and return a token', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'Test@1234',
      firstName: 'John',
      lastName: 'Doe'
    };

    const response = await request(app)
      .post('/api/register')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.token).toBeDefined();
    expect(response.body.userId).toBeDefined();
  });

  it('should return an error if email already exists', async () => {
    // Insérer un utilisateur fictif directement dans la DB pour simuler un conflit
    const existingUser = {
      email: 'existing@example.com',
      password: 'Test@1234',
      firstName: 'Jane',
      lastName: 'Doe'
    };
    await pool.execute('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)', 
      [existingUser.email, 'hashedpassword', existingUser.firstName, existingUser.lastName]);

    const response = await request(app)
      .post('/api/register')
      .send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already exists');
  });

  it('should return validation errors if data is invalid', async () => {
    const invalidUser = { email: 'invalid', password: '123' };
    const response = await request(app)
      .post('/api/register')
      .send(invalidUser);
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(2);  // Vérifie qu'il y a des erreurs
  });
});

