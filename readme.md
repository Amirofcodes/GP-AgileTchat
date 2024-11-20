# GP-AgileTchat - Account Management System

A containerized chat application account management system built with React, Node.js, Express, and MySQL. This system provides secure user registration and authentication features with a modern, responsive user interface.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Management

- User registration with email validation
- Secure password hashing
- JWT-based authentication
- User profile management

### Security

- Password strength validation
- Email verification
- Input sanitization
- CORS protection
- JWT token authentication

### Interface

- Responsive design
- Real-time form validation
- Error handling and display
- Loading states
- Navigation system

## Project Structure

```
GP-AgileTchat/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── components/
│           ├── Registration.js
│           ├── Login.js
│           └── NavigationBar.js
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   └── app.js
│   └── init.sql
└── README.md
```

## Prerequisites

- Docker (version 20.10.0 or higher)
- Docker Compose (version 2.0.0 or higher)
- Git
- Node.js (for local development only)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/GP-AgileTchat.git
cd GP-AgileTchat
```

2. Create environment files:

Frontend (.env):

```env
REACT_APP_API_URL=http://localhost:4000
```

Backend (.env):

```env
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=chat_db
JWT_SECRET=your_secure_jwt_secret
```

3. Build and start the containers:

```bash
docker-compose up --build
```

## Configuration

### Environment Variables

Frontend environment variables:

- `REACT_APP_API_URL`: Backend API URL

Backend environment variables:

- `DB_HOST`: MySQL host
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Backend server port (default: 4000)

## Running the Application

### Start the Application

```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d frontend
docker-compose up -d backend
docker-compose up -d db
```

### Stop the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove everything
docker-compose down -v --rmi all
```

## API Documentation

### Base URL

`http://localhost:4000`

### Endpoints

#### User Registration

```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### User Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Get User Profile

```http
GET /api/user
Authorization: Bearer <token>
```

### Response Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Database

### Accessing the Database

Connect using Docker:

```bash
docker-compose exec db mysql -uuser -ppassword chat_db
```

Connect using local MySQL client:

```bash
mysql -h localhost -P 3306 -uuser -ppassword chat_db
```

### Common Database Operations

```sql
-- Show all tables
SHOW TABLES;

-- Show users table structure
DESCRIBE users;

-- List all users
SELECT user_id, email, first_name, last_name, created_at FROM users;
```

## Monitoring & Maintenance

### View Logs

```bash
# All logs
docker-compose logs

# Service-specific logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Follow logs
docker-compose logs -f
```

### Container Management

```bash
# List containers
docker-compose ps

# Container stats
docker stats

# Restart services
docker-compose restart frontend
docker-compose restart backend
docker-compose restart db
```

### Health Checks

```bash
# Backend health check
curl http://localhost:4000/health

# Database connection check
docker-compose exec backend node -e "
const mysql = require('mysql2/promise');
const connection = await mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'chat_db'
});
console.log('Database connected successfully');
connection.end();
"
```

## Development

### Local Development

```bash
# Frontend development
cd frontend
npm install
npm start

# Backend development
cd backend
npm install
npm run dev
```

### Code Style

- Follow ESLint configuration
- Use Prettier for code formatting
- Follow React best practices
- Write meaningful commit messages

## Testing

### Run Tests

```bash
# Frontend tests
docker-compose exec frontend npm test

# Backend tests
docker-compose exec backend npm test

# With coverage
docker-compose exec frontend npm test -- --coverage
docker-compose exec backend npm test -- --coverage
```

## Troubleshooting

### Common Issues

1. Frontend not accessible:

```bash
# Check logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up -d --build frontend
```

2. Backend API errors:

```bash
# Check logs
docker-compose logs backend

# Verify database connection
docker-compose exec backend node src/health-check.js
```

3. Database connection issues:

```bash
# Restart database
docker-compose restart db

# Check database logs
docker-compose logs db
```

4. Container issues:

```bash
# Remove all containers and volumes
docker-compose down -v

# Remove all related images
docker-compose down --rmi all

# Rebuild everything
docker-compose up --build
```

## Security

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### JWT Token

- Expires after 24 hours
- Must be included in Authorization header
- Format: `Bearer <token>`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
