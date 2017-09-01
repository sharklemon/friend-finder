var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static('public'));

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


app.get("/api/friends", function(req, res) {
  connection.query("SELECT * FROM answerfiles;", function(err, data) {
    if (err) {
      throw err;
    }
    res.render("index", { plans: data });
  });
});

app.listen(port);
