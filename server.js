var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require('path');
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, '/app/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var port = process.env.PORT || 3000;

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

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/home.html"));
});
app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
  connection.query("SELECT * FROM answerfiles;", function(err, data) {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});


app.post("/api/friends", function(req, res) {
	console.log("name is "+req.body.name);
	var scores =[parseInt(req.body.q1.charAt(0)), parseInt(req.body.q2.charAt(0)), parseInt(req.body.q3.charAt(0)), parseInt(req.body.q4.charAt(0)), parseInt(req.body.q5.charAt(0))];
	var values = [req.body.name, req.body.pic, parseInt(req.body.q1.charAt(0)), parseInt(req.body.q2.charAt(0)), parseInt(req.body.q3.charAt(0)), parseInt(req.body.q4.charAt(0)), parseInt(req.body.q5.charAt(0))];
	var sql1 = "SELECT * FROM answerfiles"
	var bestmatchprofile = ""
	
	connection.query(sql1, function(err, result) {
		var scorearray = []
		if(err) throw err;
		console.log("results in length of "+result.length);
		for(var i=0; i < result.length; i++){
			var thismatch = [result[i].q1, result[i].q2, result[i].q3, result[i].q4, result[i].q5];
			var score = 0;
			console.log("we are in loop "+i+"and their array is " + thismatch);
			for(var z=0;z<5;z++){
				score = score + Math.abs(thismatch[z]-scores[z]);
				console.log("comparison# " +z+" ||   this match: " +thismatch[z]+" comparison: " + scores[z]+ " new score: " +score);
			}
			scorearray.push(parseInt(score));	
			console.log("score array is" + scorearray);
		}
		var bestmatch = scorearray.indexOf(Math.min(...scorearray));
		console.log("bestmach is " +bestmatch);
		bestmatchprofile=result[bestmatch];
		console.log(bestmatchprofile);
	});

	var sql2 = "INSERT INTO answerfiles (name, pic, q1, q2, q3, q4, q5) VALUES (?)";
	connection.query(sql2, [values], function(err, result) {
		if(err){
		throw err;
		}
		console.log("you entered it, name was " + req.body.name);
	});

	res.send(bestmatchprofile);

});


app.listen(port);





//app.use('/routing/apiRoutes')
// require("./routing/apiRoutes")(app);
// require("./routing/htmlRoutes")(app);
//app.use(express.static('public'));
