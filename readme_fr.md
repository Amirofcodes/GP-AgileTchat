# GP-AgileTchat - Système de Gestion de Comptes

Un système de gestion de comptes d'application de chat conteneurisé, construit avec React, Node.js, Express et MySQL. Ce système fournit des fonctionnalités sécurisées d'inscription et d'authentification des utilisateurs avec une interface moderne et responsive.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Structure du Projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement de l'Application](#lancement-de-lapplication)
- [Documentation API](#documentation-api)
- [Base de données](#base-de-données)
- [Surveillance & Maintenance](#surveillance--maintenance)
- [Développement](#développement)
- [Tests](#tests)
- [Dépannage](#dépannage)
- [Sécurité](#sécurité)
- [Contribution](#contribution)
- [Licence](#licence)

## Fonctionnalités

### Gestion des Utilisateurs

- Inscription des utilisateurs avec validation d'email
- Hachage sécurisé des mots de passe
- Authentification basée sur JWT
- Gestion des profils utilisateurs

### Sécurité

- Validation de la robustesse des mots de passe
- Vérification des emails
- Assainissement des entrées
- Protection CORS
- Authentification par token JWT

### Interface

- Design responsive
- Validation des formulaires en temps réel
- Gestion et affichage des erreurs
- États de chargement
- Système de navigation

## Structure du Projet

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

## Prérequis

- Docker (version 20.10.0 ou supérieure)
- Docker Compose (version 2.0.0 ou supérieure)
- Git
- Node.js (pour le développement local uniquement)

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/your-username/GP-AgileTchat.git
cd GP-AgileTchat
```

2. Créer les fichiers d'environnement :

Frontend (.env) :

```env
REACT_APP_API_URL=http://localhost:4000
```

Backend (.env) :

```env
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=chat_db
JWT_SECRET=your_secure_jwt_secret
```

3. Construire et démarrer les conteneurs :

```bash
docker-compose up --build
```

## Configuration

### Variables d'Environnement

Variables d'environnement Frontend :

- `REACT_APP_API_URL` : URL de l'API backend

Variables d'environnement Backend :

- `DB_HOST` : Hôte MySQL
- `DB_USER` : Nom d'utilisateur de la base de données
- `DB_PASSWORD` : Mot de passe de la base de données
- `DB_NAME` : Nom de la base de données
- `JWT_SECRET` : Clé secrète pour les tokens JWT
- `PORT` : Port du serveur backend (par défaut : 4000)

## Lancement de l'Application

### Démarrer l'Application

```bash
# Démarrer tous les services
docker-compose up -d

# Démarrer un service spécifique
docker-compose up -d frontend
docker-compose up -d backend
docker-compose up -d db
```

### Arrêter l'Application

```bash
# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v

# Arrêter et tout supprimer
docker-compose down -v --rmi all
```

## Documentation API

### URL de Base

`http://localhost:4000`

### Points d'Accès

#### Inscription Utilisateur

```http
POST /api/register
Content-Type: application/json

{
  "email": "utilisateur@exemple.com",
  "password": "MotDePasse123!",
  "firstName": "Jean",
  "lastName": "Dupont"
}
```

#### Connexion Utilisateur

```http
POST /api/login
Content-Type: application/json

{
  "email": "utilisateur@exemple.com",
  "password": "MotDePasse123!"
}
```

#### Obtenir le Profil Utilisateur

```http
GET /api/user
Authorization: Bearer <token>
```

### Codes de Réponse

- 200 : Succès
- 201 : Créé
- 400 : Mauvaise Requête
- 401 : Non Autorisé
- 403 : Interdit
- 404 : Non Trouvé
- 500 : Erreur Serveur

## Base de Données

### Accès à la Base de Données

Connexion via Docker :

```bash
docker-compose exec db mysql -uuser -ppassword chat_db
```

Connexion via client MySQL local :

```bash
mysql -h localhost -P 3306 -uuser -ppassword chat_db
```

### Opérations Courantes sur la Base de Données

```sql
-- Afficher toutes les tables
SHOW TABLES;

-- Afficher la structure de la table users
DESCRIBE users;

-- Lister tous les utilisateurs
SELECT user_id, email, first_name, last_name, created_at FROM users;
```

## Surveillance & Maintenance

### Voir les Logs

```bash
# Tous les logs
docker-compose logs

# Logs d'un service spécifique
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Suivre les logs
docker-compose logs -f
```

### Gestion des Conteneurs

```bash
# Lister les conteneurs
docker-compose ps

# Statistiques des conteneurs
docker stats

# Redémarrer les services
docker-compose restart frontend
docker-compose restart backend
docker-compose restart db
```

### Vérifications de Santé

```bash
# Vérification de santé du backend
curl http://localhost:4000/health

# Vérification de la connexion à la base de données
docker-compose exec backend node -e "
const mysql = require('mysql2/promise');
const connection = await mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'chat_db'
});
console.log('Connexion à la base de données réussie');
connection.end();
"
```

## Développement

### Développement Local

```bash
# Développement frontend
cd frontend
npm install
npm start

# Développement backend
cd backend
npm install
npm run dev
```

### Style de Code

- Suivre la configuration ESLint
- Utiliser Prettier pour le formatage du code
- Suivre les bonnes pratiques React
- Écrire des messages de commit significatifs

## Tests

### Exécuter les Tests

```bash
# Tests frontend
docker-compose exec frontend npm test

# Tests backend
docker-compose exec backend npm test

# Avec couverture
docker-compose exec frontend npm test -- --coverage
docker-compose exec backend npm test -- --coverage
```

## Dépannage

### Problèmes Courants

1. Frontend inaccessible :

```bash
# Vérifier les logs
docker-compose logs frontend

# Reconstruire le frontend
docker-compose up -d --build frontend
```

2. Erreurs API Backend :

```bash
# Vérifier les logs
docker-compose logs backend

# Vérifier la connexion à la base de données
docker-compose exec backend node src/health-check.js
```

3. Problèmes de connexion à la base de données :

```bash
# Redémarrer la base de données
docker-compose restart db

# Vérifier les logs de la base de données
docker-compose logs db
```

4. Problèmes de conteneurs :

```bash
# Supprimer tous les conteneurs et volumes
docker-compose down -v

# Supprimer toutes les images associées
docker-compose down --rmi all

# Tout reconstruire
docker-compose up --build
```

## Sécurité

### Exigences pour les Mots de Passe

- Minimum 8 caractères
- Au moins une lettre majuscule
- Au moins une lettre minuscule
- Au moins un chiffre
- Au moins un caractère spécial

### Token JWT

- Expire après 24 heures
- Doit être inclus dans l'en-tête Authorization
- Format : `Bearer <token>`

## Contribution

1. Forker le dépôt
2. Créer une branche de fonctionnalité
3. Commiter vos modifications
4. Pousser vers la branche
5. Créer une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
