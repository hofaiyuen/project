const express = require("express"); // import express package which will be used to create the backend service
const bodyParser = require("body-parser"); // import body-parser package which is used to parse the body's content from the request
const cors = require("cors");

const usersRouter = require("./users");
const accountsRouter = require("./accounts");
const transactionsRouter = require("./transactions");

// create an instance of express which will start the server.
application = express();
application.use(cors());
application.use(bodyParser.json()); // use body parser to specify how to convert body's content.

application.use("/users", usersRouter); // tell the application to use mappings from the router object
application.use("/accounts", accountsRouter);
application.use("/transactions", transactionsRouter)

// start the application on port 3000
application.listen(8000, (error) => {
  if (!error) {
    console.log("Application started succesfully");
  }
});
