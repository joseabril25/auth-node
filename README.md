# Testing CRUD API 

An API for basic authentication using JWT + User CRUD functionality. Built with
Node, Express.js, and MongoDB for the backend. 

## Running the application
```
1. Run docker-compose up --build
2. Run npm run dev or npm run start
```
## Routes

| METHOD | URL               | ACTION                        |
| ------ | ----------------- | ----------------------------- |
| POST   | api/auth/register | Create new user and set token |
| POST   | api/auth/login    | Set token                     |
| GET    | api/users         | Get all users                 |
### Authentication

- Token-based authentication with JWT/cookies
  - JWT and cookie should expire in 30 days
  - Protect routes from guest users (users not logged in)
- User registration
  - Register as “user” or “moderator” role (other roles can be implemented)
  - Once registered, a token will be sent along with a cookie
  - Passwords must be hashed
- User login
  - User can login with email and password
  - Plain text password will be compared to the stored hashed password in DB
  - Once logged in, a token will be sent along with a cookie
- User logout
  - Token will be set to none
- Get user
  - API route to get details of currently logged in user

### Users

- Get all users (Moderator and Admin)
  - API route to fetch all registered users
