const express = require("express");
const connection = require("./database"); // import connection object from database.js


// create a Router object to define URI mappings.
router = express.Router();

// URI mapping to display all users
router.get("/all", (request, response) => {
  // in the callback function, use mysql connection to execute select query
  //connection.query(`select * from users`, (errors, results) => {
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
  });
});

// URI mapping to display customer with an id specified in the request
router.get("/id", (request, response) => {

  if (request.body.id == null || request.body.id == "") {
    response.status(400).send("Invalid ID");
    return;
  }

  // in the callback function, use mysql connection to execute select query
  connection.query(
    `select u.id, u.name, u.ic_number, u.email, u.mobile, u.password, a.account_ID,
    a.account_type, a.balance, a.max_limit, a.date_create from users as u left join accounts as a
    on u.id = a.user_id where id = ${request.body.id}`,
    (errors, results) => {
      // populate the response object with the results received from mysql server.
      response.send(results);
    }
  );
});
/*router.put("/email", (request, response) => {
  connection.query(`update users set email = ${request.body.email} where id = ${request.body.id}`,
    (error, results) => {
      if (errors) {
        console.log(errors);
        response.status(400).send("Server error.");
      } else {
        response.send(results);
      }
    });

});*/

router.get("/transactions", (request, response) => {

  if (request.body.id == null || request.body.id == "") {
    response.status(400).send("Invalid ID");
    return;
  }
  // in the callback function, use mysql connection to execute select query
  connection.query(
    `select u.id, u.name, u.ic_number, a.account_ID,
    t.account_number, t.transaction_type, t.amount, t.date from users as u left join accounts as a
    on u.id = a.user_id left join transactions as t on a.account_id = t.account_id where id = ${request.body.id}`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(400).send("Server error.");
      } else {
        response.send(results);
      }
    }
  );
});
router.post("/add", (request, response) => {
  //add validation checks
  if (request.body.id == null || request.body.id == "") {
    response.status(400).send("Invalid ID");
    return;
  }
  if (request.body.name == null || request.body.name == "") {
    response.status(400).send("Invalid Name");
    return;
  }

  if (request.body.ic_number == null || request.body.ic_number == "") {
    response.status(400).send("Invalid IC_Number");
    return;
  }

  if (request.body.email == null || request.body.email == "") {
    response.status(400).send("Invalid Email");
    return;
  }

  if (request.body.mobile == null || request.body.mobile == "") {
    response.status(400).send("Invalid mobile");
    return;
  }

  if (request.body.password == null || request.body.password == "") {
    response.status(400).send("Invalid password");
    return;
  }

  // in the callback function, use mysql connection to execute select query
  connection.query(
    `insert into users (id,name, ic_number, email, mobile, password) values ('${request.body.id}','${request.body.name}','${request.body.ic_number}','${request.body.email}',${request.body.mobile},'${request.body.password}')`,
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