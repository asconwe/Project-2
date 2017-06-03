var db = require("../models");
module.exports = function (app) {
	//================= Listen for updates to reopen an activity
	app.put("/api/activity/open/:id", function (req, res) {
		db.Activity.update({ completed: false, }, {
			where: {
				ActivityId: req.params.id
			}
		}).then(function (userAndActivity) {
			//================= Return user to their profile
			res.redirect('/profile?key=id&val=' + req.body.PersonId);
		});
	});
}