# Role-Based Auth API

A Node.js + Express + MongoDB API with JWT authentication and role based access control.  
Supports user signup/login, role management (admin/user), and secure API endpoints.

---

## Features

- JWT based authentication
- Role based access control (Admin/User)
- MongoDB with Mongoose for database operations
- Secure password hashing with bcrypt
- CRUD endpoints for managing roles

---

## Installation & Setup

## Clone the repository

https://github.com/Joseph-web-create/TSA_TASK2

npm install

npm run dev

create .env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

--

Authentication & Role-Based Access
JWT Authentication: Users receive a JWT token after login.

Roles:

user → default role after signup

admin → has elevated permissions

Role can be updated by an admin via the /changeRole/:id endpoint.

--

📚 API Endpoints

1: Signup
POST /api/auth/register

{
"name":"Joe",
"email":"aace.com"
"password": "12345"
}

✅ Response

{
"success": true,
"message": "Account created successfully",
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OWI4ZDEzNjlmZDAzMWU4MDgwZGNjMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU1MDI0NjU5LCJleHAiOjE3NTUwMjgyNTl9.aPCueRjYr_HLeYSLh4mGTPIOqVf44JdEvdaeRXKHyPo"
}

2: Login
POST /api/auth/login

{
"name":"Joe",
"password": "12345"
}

✅ Response

{
"success": true,
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OWI3MWE4NDQwYjg2NGU0YzBiNTdiNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NTAyMjgyNCwiZXhwIjoxNzU1MDI2NDI0fQ.AI2roH41klSPmvQVMMtzcxtrN0nGP4QMmjvpQMJdzB0",
"message": "Welcome Joe",
"user": {
"\_id": "689b71a8440b864e4c0b57b5",
"name": "Joe",
"email": "aace.com",
"password": "$2b$10$1Eej8WMk.GHaTGlBmVRQQOQN/iX5BfdIyKhc7DhRjBgG0UlqELjI.",
"role": "admin",
"createdAt": "2025-08-12T16:54:00.713Z",
"updatedAt": "2025-08-12T18:17:48.008Z",
"\_\_v": 0
}
}

3: Change Role

PATCH /api/auth/changeRole/:id

{
"role":"admin"
}

✅ Response

{
"success": true,
"message": "Role changed",
"user": {
"\_id": "689b71a8440b864e4c0b57b5",
"name": "Joe",
"email": "aace.com",
"role": "admin",
"createdAt": "2025-08-12T16:54:00.713Z",
"updatedAt": "2025-08-12T18:55:20.816Z",
"\_\_v": 0
}
}

## Posts API

POST /api/posts/createPost

Authorization: Bearer <jwt-token>(admin only)

{
"title":"Mango",
"content": "jddjddiodiodiod",
"author":"Bliss"
}

✅ Response

{
"success": true,
"message": "Post created successfully",
"post": {
"title": "Mango",
"content": "jddjddiodiodiod",
"author": "Bliss",
"\_id": "689b8674552b9fe37d3b28bf",
"\_\_v": 0
}
}

GET /api/posts/getAllPosts

Authorization: Bearer <jwt-token>

{
"success": true,
"posts": [
{
"_id": "689b8674552b9fe37d3b28bf",
"title": "Mango",
"content": "jddjddiodiodiod",
"author": "Bliss",
"__v": 0
}
]
}

Authentication Flow
Signup/Login → User gets JWT token.
Include token in Authorization header for protected routes:
Authorization: Bearer your_jwt_token
Role check is done in middleware before executing admin-only actions.

Technologies Used

Node.js & Express
MongoDB & Mongoose
JWT for authentication
bcrypt for password hashing
