# Trial API for Changing Digital

An API for basic authentication using JWT + User CRUD functionality. Built with
Node, Express.js, and MongoDB for the backend. This is currently deployed on [Heroku](https://trial-auth-api.herokuapp.com/).

## Routes

| METHOD | URL               | ACTION                        |
| ------ | ----------------- | ----------------------------- |
| POST   | api/auth/register | Create new user and set token |
| POST   | api/auth/login    | Set token                     |
| GET    | api/auth/logout   | Clear token                   |
| GET    | api/auth/me       | Get current logged in user    |
| POST   | api/users         | Create new user manually      |
| GET    | api/users         | Get all users                 |
| PATCH  | api/users/:id     | Update user                   |
| DELETE | api/users/:id     | Delete user                   |

## Resources

This API only has two resources:
[Authentication](https://github.com/sirbully/CD-auth-api#authentication) and
[Users](https://github.com/sirbully/CD-auth-api#users).

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

- Add user (Admin only)
  - API route to manually add user without registering
- Get all users (Moderator and Admin)
  - API route to fetch all registered users
- Update user (Current user, Admin, and Moderator)
  - API route to update details of a specific user
- Delete user (Current user and Admin)
  - API route to delete specific user
