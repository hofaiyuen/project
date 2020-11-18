const express = require("express");
const connection = require("./database");

router = express.Router(); // create a router in users, accounts and transactions.js

router.get("/all", (request, response) => {
  // in the callback function, use mysql connection to execute select query
  connection.query(`select u.id, u.name, u.ic_number, a.account_ID,
  t.account_number, t.transaction_type, t.amount, t.date from users as u left join accounts as a
  on u.id = a.user_id left join transactions as t on a.account_id = t.account_id`, (errors, results) => {
    // populate the response object with the results received from mysql server.
    response.send(results);
  });
});

// URI mapping to display transactions with an id specified in the request
router.get("/transaction_id", (request, response) => {

  if (request.body.transaction_id == null || request.body.transaction_id == "") {
    response.status(400).send("Invalid transaction_ID");
    return;
  }
  // in the callback function, use mysql connection to execute select query
  connection.query(
    `select * from transactions where transaction_id = ${request.body.transaction_id}`,
    (errors, results) => {
      // populate the response object with the results received from mysql server.
      response.send(results);
    }
  );
});

// Define a URI mapping to add a new product into the Product table
router.post("/add", (request, response) => {
  //add validation checks
  if (request.body.name == null || request.body.name == "") {
    response.status(400).send("Invalid Name");
    return;
  }

  if (request.body.price === undefined) {
    response.status(400).send("Invaild Price");
    return;
  }

  // in the callback function, use mysql connection to execute select query
  connection.query(
    `insert into product (product_name, product_market_price) values ('${request.body.name}', ${request.body.price})`,
    (errors, results) => {
      // Populate the response with a success message
      response.send("Data inserted successfully");
    }
  );
});

// export router object so that other files could import it.
module.exports = router;