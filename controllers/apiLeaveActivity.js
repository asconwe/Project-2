	var db = require("../models");
	module.exports = function (app) {
		app.delete("/api/personactivity/leave", function (req, res) {
			console.log('now here====================', req.body);
			db.JoinedActivity.destroy({where: {ActivityId: req.body.id, PersonId: req.body.PersonId
			}}).then(function (JoinedActivity) {
				   res.redirect('/profile?key=id&val=' + req.body.PersonId);
			  });
		});
	}