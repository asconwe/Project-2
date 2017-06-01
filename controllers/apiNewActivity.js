var db = require("../models");

module.exports = function (app) {
  app.post("/api/activity/new", function (req, res) {
    console.log('now here====================', req.body);
    var activity = req.body;
    activity.complete = false;
    db.Activity.create(activity).then(function (dbActivity) {
      console.log(dbActivity.id);
      db.TagActivity.create({ ActivityId: dbActivity.id, TagId: req.body.TagId });
      db.JoinedActivity.create({ ActivityId: dbActivity.id, PersonId: req.body.PersonId }).then(function (userAndActivity) {
        // res.json(dbActivity);
        res.redirect('/profile?key=id&val=' + req.body.PersonId);
      });
    });
  });
}
