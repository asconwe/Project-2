var db = require("../models");

module.exports = function (app) {
  //================= Listen for new user posts
  app.post("/api/user/new", function (req, res) {
    db.Person.findOne({ where: { username: req.body.username } }).then(function (result) {
      if (result != null) { // If the username already exists
        res.json('That username is already taken');// Fix this behavior in modal.js
      }
      else {
        db.Person.create(req.body).then(function (dbPerson) {
          //================= Return user to landing page with new user message
          res.redirect('/?m=new');
        });
      }
    });
  });
}
