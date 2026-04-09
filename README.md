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