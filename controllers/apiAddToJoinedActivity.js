	var db = require("../models");
	module.exports = function (app) {
		app.post("/api/personactivity", function (req, res) {
			console.log(req.body)
			db.JoinedActivity.create({ 
				ActivityId: req.body.ActivityId, PersonId: req.body.PersonId
			}).then(function (userAndActivity) {
				res.json({ message: 'Welcome to this activity!' });
			  });
		});
	}