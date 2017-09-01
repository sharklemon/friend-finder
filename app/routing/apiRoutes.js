var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "friendfind_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


app.post("/api/friends", function(req, res) {
  connection.query("INSERT INTO answerfiles (name, pic, q1, q2, q3, q4, q5) VALUES (?)", [req.body.plan], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});
module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
	  connection.query("SELECT * FROM answerfiles;", function(err, data) {
	    if (err) {
	      throw err;
	    }
	    res.json(data);
	  });
	});
};


// module.exports = function(app) {
//   // API GET Requests
//   // Below code handles when users "visit" a page.
//   // In each of the below cases when a user visits a link
//   // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
//   // ---------------------------------------------------------------------------

//   app.get("/api/tables", function(req, res) {
//     res.json(tableData);
//   });

//   app.get("/api/waitlist", function(req, res) {
//     res.json(waitListData);
//   });

//   // API POST Requests
//   // Below code handles when a user submits a form and thus submits data to the server.
//   // In each of the below cases, when a user submits form data (a JSON object)
//   // ...the JSON is pushed to the appropriate JavaScript array
//   // (ex. User fills out a reservation request... this data is then sent to the server...
//   // Then the server saves the data to the tableData array)
//   // ---------------------------------------------------------------------------

//   app.post("/api/tables", function(req, res) {
//     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//     // It will do this by sending out the value "true" have a table
//     if (tableData.length < 5) {
//       tableData.push(req.body);
//       res.json(true);
//     }
//     else {
//       waitListData.push(req.body);
//       res.json(false);
//     }
//   });

//   // ---------------------------------------------------------------------------
//   // I added this below code so you could clear out the table while working with the functionality.
//   // Don"t worry about it!

//   app.post("/api/clear", function() {
//     // Empty out the arrays of data
//     tableData = [];
//     waitListData = [];

//     console.log(tableData);
//   });
// };
