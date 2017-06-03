	var db = require("../models");
	module.exports = function (app) {
		app.get("/api/personactivity/leave/:person/:act", function (req, res) {
		db.JoinedActivity.findOne({where: {ActivityId: req.params.act, PersonId: req.params.person
			}}).then(function (dbActivity) { 
			res.json(dbActivity);
		})
	})
		app.delete("/api/personactivity/leave/:person/:act", function (req, res) {
			db.JoinedActivity.destroy({where: {ActivityId: req.params.act, PersonId: req.params.person
			}}).then(function (JoinedActivity) {
					console.log(req.body.PersonId);
					res.json(JoinedActivity);
				   res.redirect('/profile?key=id&val=' + req.body.PersonId);
			  });
			});
		};
		