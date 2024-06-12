# Access Token and Refresh Token in Backend

## Fixed Some Logical Error 
- Fixed the logical error in the `user.controller.js` file.

## Create Endpoints in POSTMAT
- Create a new endpoint for the user `Login`
- Create a new endpoint for the user `Logout`

## Discussion abot Access Token and Refresh Token
- The `major` work of both token is to, user does not have to give the `email` and `password` again and again.
- Access tokens are `short-lived` whereas refresh tokens are `long-lived`.
- Refresh tokens are placed inside the database. Becuse as the access token expiries, the frontend developer hit the new endpoint with the refresh token and we generate new access tokens for the user so that, user does not have to signup again.

## Creating a new endpoint for the frontend engineer
