# Node.js TypeORM Assessment API

## Overview
This is a **Node.js REST API** built with **Express.js** and **TypeORM** to manage user data.  
It supports **registration**, **login**, **listing**, **searching**, **filtering**, and **role-based access** (Admin/Staff).

---

## Features

1. **User Registration**
   - Fields: `name`, `email`, `password`, `role` (Admin/Staff), `phone`, `city`, `country`
   - Passwords are hashed using `bcryptjs`
   - Input validation ensures proper data

2. **User Login**
   - Returns a **JWT token** for authentication
   - Fields: `email`, `password`

3. **List Users** (Admin only)
   - Search by `name` or `email` (`?search=...`)
   - Filter by `country` (`?country=...`)
   - Excludes password in response

4. **User Details**
   - Staff: Can view **own details only**
   - Admin: Can view **any user details**
   - Password never returned

---

## Technologies Used

- Node.js  
- Express.js  
- TypeORM (MySQL)  
- bcryptjs (password hashing)  
- jsonwebtoken (JWT authentication)  
- express-validator (request validation)  
- cors & morgan  

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd node-typeorm-assessment

2. Install Dependencies
npm install

3. Environment Variables
Create a .env file:
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=OwnAi_Server
JWT_SECRET=your_jwt_secret


4. Database Setup
Start MySQL server
Create database: CREATE DATABASE OwnAi_Server;
For development: Set synchronize: true in data-source.js or run migrations.

5. Run Server
Development (auto-reload): npm run dev
Production: npm start

6. Base URL - http://localhost:5000/api

## API Endpoints

Auth Routes
| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/auth/register` | Register a new user     |
| POST   | `/auth/login`    | Login and get JWT token |

User Routes
| Method | Endpoint     | Description                                  | Access      |
| ------ | ------------ | -------------------------------------------- | ----------- |
| GET    | `/users`     | List all users (with optional search/filter) | Admin only  |
| GET    | `/users/:id` | Retrieve user details by ID                  | Admin/Staff |

Note - All protected routes require Authorization: Bearer <token> header.

## Input Validation
- Name: Required
- Email: Required, valid email
- Password: Minimum 6 characters
- Role: Must be Admin or Staff
- Phone: Optional, valid mobile format
- Country: Required

## Error Handling
400 – Bad Request (Validation errors)
401 – Unauthorized (JWT missing/invalid)
403 – Forbidden (Role-based access)
404 – Not Found (User not found)
500 – Internal Server Error

## Authentication & Security
Passwords are hashed with bcryptjs
JWT expires in 8 hours

## Example Requests
Register :-
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Staff",
  "phone": "1234567890",
  "city": "Mumbai",
  "country": "India"
}

Login :-
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

List Users (Admin) :- 
GET /api/users?search=john&country=India
Authorization: Bearer <token>

Get User Details :- 
GET /api/users/1
Authorization: Bearer <token>

Notes - 
Password is never returned in any API response.
Use express-validator for request validation.
Role-based access is enforced with middleware.
TypeORM handles all database interactions.


## Author
Yash Dungariya – Node.js Developer Assessment Submission
