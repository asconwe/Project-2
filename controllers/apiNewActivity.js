var db = require("../models");

module.exports = function (app) {
  //================= Listen for new activity posts
  app.post("/api/activity/new", function (req, res) {
    var activity = req.body;
    activity.complete = false;
    db.Activity.create(activity).then(function (dbActivity) {
      // associate the tags and any joined users
      db.TagActivity.create({ ActivityId: dbActivity.id, TagId: req.body.TagId });
      db.JoinedActivity.create({ ActivityId: dbActivity.id, PersonId: req.body.PersonId }).then(function (userAndActivity) {
        //================= Return the user to their profile with the new activity added
        res.redirect('/profile?key=id&val=' + req.body.PersonId);
      });
    });
  });
}
