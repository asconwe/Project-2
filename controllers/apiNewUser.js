var db = require("../models");

module.exports = function(app) {
  app.post("/api/user/new", function(req, res) {
    db.Person.findOne({where:{username:req.body.username}}).then(function(result) {
      console.log(req.body);
      console.log(typeof result);
      console.log(!result);
      if(result != null){
        res.json({message:"this user already exists"});
      }
      else {
        db.Person.create(req.body).then(function(dbPerson) {
          res.json(dbPerson);
        });
      }

    }
  );
});
}
