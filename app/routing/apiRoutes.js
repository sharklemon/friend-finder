app.post("/api/friends", function(req, res) {
  connection.query("INSERT INTO answerfiles (name, pic, q1, q2, q3, q4, q5) VALUES (?)", [req.body.plan], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

app.get("/api/friends", function(req, res) {
  connection.query("SELECT * FROM answerfiles;", function(err, data) {
    if (err) {
      throw err;
    }
    res.render("index", { plans: data });
  });
});
