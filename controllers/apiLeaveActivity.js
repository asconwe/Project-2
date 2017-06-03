var db = require("../models");
module.exports = function (app) {
	//================= Listen for delete request to remove a user's connection to an activity
	app.delete("/api/personactivity/leave", function (req, res) {
		db.JoinedActivity.destroy({
			where: {
				ActivityId: req.body.id, PersonId: req.body.PersonId
			}
		}).then(function (JoinedActivity) {
			//================= Return the user to their profile where the updated activities will be
			res.redirect('/profile?key=id&val=' + req.body.PersonId);
		});
	});
}