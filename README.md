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