var db = require("../models");

module.exports = function (app) {
  app.post("/api/activity/new", function (req, res) {
    console.log('now here====================', req.body);
    var activity = req.body;
    var tagArr=[];
    for (var item in activity) {
      if (isNaN(parseInt(activity[item]))){
        console.log("not a number");
      }
      else {
        tagArr.push(activity[item]);
      }
    }
//remove final index in array that is not a tag
    tagArr.splice(-1,1);
    activity.complete = false;
    db.Activity.create(activity).then(function (dbActivity) {
      console.log(dbActivity.id);
      for(var i=0; i<tagArr.length; i++) {
        db.TagActivity.create({ ActivityId: dbActivity.id, TagId: tagArr[i] });
      }
      db.JoinedActivity.create({ ActivityId: dbActivity.id, PersonId: req.body.PersonId }).then(function (userAndActivity) {
        // res.json(dbActivity);
        res.redirect('/profile?key=id&val=' + req.body.PersonId);
      });
    });
  });
}
