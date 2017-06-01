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
				console.log(dbAllActivities[index].joined, '===============');
				activity.JoinedActivities.forEach(function (participant) {
					console.log(userId, '=======participant========', participant);
					if (parseInt(participant.PersonId) === parseInt(userId)) {
						dbAllActivities[index].joined = true;
						console.log(dbAllActivities[index].joined)
					}
				});
			})
			res.render('activities',
				{
					allActivities: true,
					activities: dbAllActivities,
					style: 'profile',
					userId: userId,
				});
		});

	});
}
