var db = require("../models");
module.exports = function (app) {
	//================= Listen for delete request to remove a user's connection to an activity
	app.post("/api/personactivity/leave/:id/:PersonId", function (req, res) {
		db.JoinedActivity.destroy({
			where: {
				ActivityId: req.params.id, PersonId: req.params.PersonId
			}
		}).then(function (JoinedActivity) {
			//================= Return the user to their profile where the updated activities will be
			res.redirect('/profile?key=id&val=' + req.params.PersonId);
		});
	});
}

