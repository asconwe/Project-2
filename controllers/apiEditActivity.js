var db = require("../models");
module.exports = function (app) {
	//================= Listen for a get request and return the activity information
	app.get("/api/activity/edit/:id", function (req, res) {
		db.Activity.findOne({ where: { ActivityId: req.params.id } }).then(function (dbActivity) { 
			res.json(dbActivity);
		})
	})
	// The information from the first request populates on the client's text fields
	// Then the user edits the information and clicks submit
	//================= Listen for the updated information
	app.put("/api/activity/edit/:id", function (req, res) {
		db.JoinedActivity.update({ itemName: req.body.itemName, tags: req.body.tags, location: req.body.location, description: req.body.description, complete: false }, {
			where: {
				ActivityId: req.params.id
			}
		}).then(function (Activity) {
			//================= Return user to their profile where updated activity information will populate
			res.redirect('/profile?key=id&val=' + req.body.PersonId);
		});
	});
}