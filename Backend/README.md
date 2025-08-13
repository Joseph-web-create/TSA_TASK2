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





### Register User Endpoint

This endpoint allows users to register a new account by providing their personal details. Upon successful registration, the user will receive an access token for authentication in subsequent requests.

#### Request

- **Method:** POST
    
- **URL:** [https://tsa-task2-1.onrender.com/api/auth/registerEndFragment](https://tsa-task2-1.onrender.com/api/auth/registerEndFragment)
    
- **Content-Type:** application/json
    

#### Request Body Parameters

| Key | Type | Description |
| --- | --- | --- |
| `name` | string | The full name of the user. |
| `email` | string | The email address of the user. |
| `password` | string | The password for the user account. |

#### Expected Response

- **Status Code:** 201 Created
    
- **Content-Type:** application/json
    

#### Response Body

| Key | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the registration was successful. |
| `message` | string | A message providing additional information (if any). |
| `accessToken` | string | A token used for authenticating subsequent requests. |

#### Notes

- Ensure that the email provided is unique and valid to avoid registration errors.
    
- The password should meet security standards (e.g., minimum length, complexity).
    
- The `accessToken` returned in the response is crucial for user authentication in future API calls.


see more here:

https://documenter.getpostman.com/view/43530078/2sB3BGGUnr