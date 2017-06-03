var db = require("../models");
module.exports = function (app) {
	//================= Listen for post requests to join an activity and user
	app.post("/api/personactivity", function (req, res) {
		db.JoinedActivity.create({
			ActivityId: req.body.ActivityId, PersonId: req.body.PersonId
		}).then(function (userAndActivity) {
			res.json({ message: 'Welcome to this activity!' });
		});
	});
}