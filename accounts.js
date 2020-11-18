const express = require("express");
const connection = require("./database"); // import connection object from database.js

// create a Router object to define URI mappings.
router = express.Router();

// URI mapping to display all customers
router.get("/all", (request, response) => {
  // in the callback function, use mysql connection to execute select query
  connection.query(`select u.id, u.name, u.ic_number, u.email, u.mobile, u.password, a.account_ID,
  a.account_type, a.balance, a.max_limit, a.date_create from users as u left join accounts as a
  on u.id = a.user_id`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(400).send("Server error.");
    } else {
      // populate the response object with the results received from mysql server.
      response.send(results);
    }
  })
});
router.post("/add", (request, response) => {
  //add validation checks
  if (request.body.account_id == null || request.body.accoun_id == "") {
    response.status(400).send("Invalid Account ID");
    return;
  }
  if (request.body.account_type == null || request.body.account_type == "") {
    response.status(400).send("Invalid Account Type");
    return;
  }

  if (request.body.balance == null || request.body.balance == "") {
    response.status(400).send("Invalid Balance");
    return;
  }

  if (request.body.max_limit == null || request.max_limit == "") {
    response.status(400).send("Invalid Max Limit");
    return;
  }

  if (request.body.user_id == null || request.body.user_id == "") {
    response.status(400).send("Invalid User ID");
    return;
  }

  if (request.body.date_create == null || request.body.date_create == "") {
    response.status(400).send("Invalid Date Create");
    return;
  }

  // in the callback function, use mysql connection to execute select query
  connection.query(
    `insert into accounts (account_id,account_type, balance, max_limit, user_id, date_create) values 
    ('${request.body.account_id}','${request.body.account_type}','${request.body.balance}','${request.body.max_limit}',${request.body.user_id},'${request.body.date_create}')`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(400).send("Server error.");
      } else {
        response.send("Customer inserted successfully");
      }
    }
  );
});

module.exports = router;