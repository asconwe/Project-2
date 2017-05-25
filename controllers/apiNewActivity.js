var db = require("../models");

module.exports = function(app) {
  app.post("/api/activity/new", function(req, res) {
    var activity = req.body;
    activity.complete = false;
    db.Activity.create(activity).then(function(dbActivity) {
        console.log(dbActivity.id);
        db.UserAndActivity.create({ ActivityId: dbActivity.id, PersonId: req.body.PersonId }).then(function(userAndActivity){                     
          res.json(dbActivity);
        });
      });
    }
  )
};
