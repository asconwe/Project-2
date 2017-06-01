var db = require("../models");
module.exports = function (app) {
	app.get("/api/activity/edit/:id", function (req, res) {
		db.Activity.findOne({ where: { ActivityId: req.params.id } }).then(function (dbActivity) { 
			res.json(dbActivity);
		})
	})
	app.put("/api/activity/edit/:id", function (req, res) {
		console.log('now here====================', req.body);
		db.JoinedActivity.update({ itemName: req.body.itemName, tags: req.body.tags, location: req.body.location, description: req.body.description, complete: false }, {
			where: {
				ActivityId: req.params.id
			}
		}).then(function (Activity) {
			res.redirect('/profile?key=id&val=' + req.body.PersonId);
		});
	});
}