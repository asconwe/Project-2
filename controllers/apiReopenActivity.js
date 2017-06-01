	var db = require("../models");
	module.exports = function (app) {
		app.put("/api/activity/open/:id", function (req, res) {
			console.log('now here====================', req.body);
			db.Activity.update({completed:false,}, {where: {ActivityId: req.params.id
			}}).then(function (userAndActivity) {
				   res.redirect('/profile?key=id&val=' + req.body.PersonId);
			  });
		});
	}