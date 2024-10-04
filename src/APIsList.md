# DevTinder APIs

authRouther
- POST /signup
- POST /login
- POST /logout


profileRouther
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

ConnectionRequestRouther
- POST /request/send/intereted/:userId
- POST /request/send/ignored/:userId
- POST /request/review/acceptect/:requestId
- POST /request/review/rejected/:requestId

- GET /user/connection
- GET /user/requests
- GET /user/feed - Gets you the profile of other users on platform


Status: ignore , intrested , accepted , rejected.