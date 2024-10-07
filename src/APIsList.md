# DevTinder APIs

authRouther
- POST /signup
- POST /login
- POST /logout


# profileRouther
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# ConnectionRequestRouther
- POST /request/send/:status/:userId // Ignore , intrested 


 # Accepted or Reject
- POST /request/review/:status/:requestId 
- POST /request/review/rejected/:requestId

GET /user/requests/recived
- GET /user/connection
- GET /user/feed - Gets you the profile of other users on platform


Status: ignore , intrested , accepted , rejected.


# PAGINATION
Feed?page=1&Limit10 => 1-10

Feed?page=2&Limit10 => 11-20

Feed?page=3&Limit10 => 21-30


.skip(0) & .limit(10)
skip = (page-1)*limit;
