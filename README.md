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

# write newPassword route, controller, 
- write newPassword route 
- call the controller inside thr route 
- write controller

# learn how to send email 
- js will not send email directly to the user 
- we use nodemailer for that 
- we install nodemailer 
- amd login to mailtrap 
- mailtrap is post office for testing your email code 
- mailtrap help us to test your email 
- create isVerifyEmail service 
- that service receive token and verify the mail 
- write controller to call this service 

user => send email(TOKEN) => nodemailer => mailtrap => send in MAILTRAP inbox (testing phase )

user => send email(TOKEN) => nodemailer => SMTP  => send in REAL USER (LIVE APP )

# write route inside the express app
- export route file 
- import in app.js 
- add middleware inside the app.js file 
- express.json => json => js Object
- urlencoded => fromData => js Object
- cookieParser => to read cookies from req
- express does not do this alone for that he use above middleware
- and add script inside the package.json which is start

# create docker.compose.yml file 

- setup mongodb 




# fs module 

- learn sync methods
- learn async methods
- learn promises methods

# setup multer 
- its middleware
- help to read multiPart-from-data sending from the browser
- install multer 
- multer stored file by default in memory
- that is file come in buffer format 
- we use diskStorage for that
- diskStorage take two keys first is path 2nd is unique name
- add the data into uploads file but it not human cannot read this
- for that we add extension in 2nd key
- we import path
- and extract file extension from that and use it 

- learn how to add file limit on file 
- and also add file extension limit  

## how to take multiple images 

## how to take multiple fields

# learn how to use IMAGE-KIT and make avatar url

- update the mongoose schema with avatar filed 
- write route and controller 
- and add multer as middleware 
- go to image-kit documentation
- install image-kit
- go to image-kit-io and login there
- make env variable
- add image kit configurations inside common/config
- write service


# IPL Management APP 

- Create folder IPL-management system inside src/modules/
- Create folder modules, routes, controllers, services inside IPL-management/
- write model 
- write route 
- write controller 
- write services

