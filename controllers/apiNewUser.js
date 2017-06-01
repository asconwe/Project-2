var db = require("../models");

module.exports = function (app) {
  app.post("/api/user/new", function (req, res) {
    console.log('============================================', req.body);
    db.Person.findOne({ where: { username: req.body.username } }).then(function (result) {
      console.log(typeof result);
      console.log(!result);
      if (result != null) {
        res.json('That username is already taken');
      }
      else {
        db.Person.create(req.body).then(function (dbPerson) {
          res.redirect('/?m=new');
        });
      }
    });
  });
}
