var db = require("../models");

module.exports = function (app) {
  app.post("/api/activity/edit", function (req, res) {
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
    db.Activity.findOne({where:{ActivityId: dbActivity.id}}).then(function (dbeditActivity) {
    	db.Activity.update(activity).then(function (dbeditActivity) {
			console.log(dbActivity.id);
			for(var i=0; i<tagArr.length; i++) {
			db.TagActivity.update({ ActivityId: dbActivity.id, TagId: tagArr[i] });
			}
			db.JoinedActivity.update({ ActivityId: dbActivity.id, PersonId: req.body.PersonId }).then(function (userAndActivity) {
        		res.redirect('/profile?key=id&val=' + req.body.PersonId);
    		});
   		});
  	});
});
}			