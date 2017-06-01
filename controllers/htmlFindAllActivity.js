var db = require("../models");

module.exports = function (app) {
	app.get("/allactivities", function (req, res) {
		var userId = req.query.id;
		db.Activity.findAll({
			include: [{
				model: db.TagActivity,
				include: [{
					model: db.Tag
				}]
			}, {
				model: db.JoinedActivity	
			}]
		}).then(function (dbAllActivities) {
			dbAllActivities.forEach(function (activity, index) { 
				dbAllActivities[index].joined = false;
				activity.JoinedActivities.forEach(function (participant) {
					if (parseInt(participant.PersonId) === parseInt(userId)) {
						dbAllActivities[index].joined = true;
					}
				});
			})
			res.render('activities',
				{
					allActivities: true,
					activities: dbAllActivities,
					style: 'profile',
					profile: { id: userId }
				});
		});

	});
}
