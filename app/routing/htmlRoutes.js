app.get("/", function(req, res) {
  connection.query("SELECT * FROM answerfiles;", function(err, data) {
    if (err) {
      throw err;
    }
    res.render("index", { plans: data });
  });
});


app.get("/survey", function(req, res) {
  connection.query("SELECT * FROM answerfiles;", function(err, data) {
    if (err) {
      throw err;
    }
    res.render("index", { plans: data });
  });
});
