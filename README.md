- set up the git

- add type=module in package.json

- create src folder
- create server.js app.js env file inside src folder
- create express server in app.js file 
- listen the req the server in server.js file 

- create common and modules inside the src folder
- inside common we create db.js file and write db connection here 
- and call the db connection from server.js 

- create utils folder inside the common 
- and crete api-response.js file 

# make standardize error or response
- create ApiResponse class => for the return res to clint 
- create ApiError class  => for the throw an error 
- also learn how to show specific error and hide extra lines => using captureStackTrace
- and show safe error to user => using isOperational (email is wrong)

# create DTO

- step 1 => create baseDto class 
    - inside that create schema object 
    - and validate method 
    - this method show all the error at once 
    - and avoid extra fields 

- step 2 => create middleware 
    - inside that pass the dtoClass 
    - and write the middleware 

# create first user model (schema) using mongoose

- create schema using mongoose 
    - they take object and inside that object we define structure of mongodb document and data types and validation 
    - he directly do not talk to mongodb 

- create model 
    - model using schema and  talk to mongodb and perform crud operations 

# create registerDto class inside dto folder
- inside that override the object
- and write fields to need user to register

# create req flow 
- create end point inside router.js file 
- add middleware DtoClass 
- Dto class hold the parent method which is validate 
- child class override the schema
- call the next and send req to controller
- call the controller 
- controller cal the service 
- service hold the business logic 

# generate jwtToken || create first user in db
- create jwtToken using crypto 
- used to send verify email 
- and made two token 1 is rawToken and 2 is hashedToken
- create first user

# generate accessToken and refreshToken using jwt for user to login
- create accessToken using jwt.sign()
- and verify the accessToken using jwt.verify()

- create refreshToken using jwt.sign()
- and verify the refreshToken using jwt.verify()

# create login service 
- take email and password 
- check in db exist or not and check correct or not 
- then check isVerified or not 
- if verified generate accessToken refreshToken
- refreshToken saved id db 
- accessToken and refreshToken send to the clint  

# create refreshService
- check token is valid or not 
- verify the token 
- find the user in db according to verify token data
- generate accessToken and refreshToken 
- update the refreshToken inside the db 
- and send the accessToken to the user

# create logout service 
- check user exist or not 
- if exist update the refreshToken value = null 

# create forgot password to the user
- for that we take mail from the user 
- i check this mail exist in db 
- if exist i create token 
- one token send to the user 
- another save in db {in hashed format }

# create reset-password service 
- take token and new password from the user 
-  check token exist in db
- check expired token 
- update new password from db 
- delete the token  

# make the password hashable format 
- for that we use bcrypt library 
- and we use pre hooke is given by mongoose 
- inside that we write password hashable logic 
- this bcrypt.hash method take password and salt round 
- salt round is random string 
- and make password hashable and save in db 
- call the next 

# compare password using bcrypt.compare
- this take user password 
- schema password which saved in db in hash format 
- and compare two values 
- and return true or false 

# check password inside the login service using userSchema.methods.comparePassword method 
- we send password and call the method 

# create middleware which check user loggedIn or not and user role 
- take token => verify the token => and get the id from token => find user based on Id inside User Model => edit the req => call next()  
- take role => check req.user.role => give the access based on permission

# write Login route, loginDtoClass, controller, 
- write loginDto 
- write route 
- call the controller inside thr route 
- - write controller

# write logout route, controller, 
- write logout route 
- call the controller inside thr route 
- write controller

# write refresh route, controller, 
- write refresh route 
- call the controller inside thr route 
- write controller

# write forgotPassword route, controller, 
- write forgotPassword route 
- call the controller inside thr route 
- write controller