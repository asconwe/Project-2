var db = require("../models");

module.exports = function (app) {
	app.get("/allactivities/one/:id", function (req, res) {
		console.log(req.body)
		var tagId = req.params.id;
		var activityId = req.body.PersonId
		db.JoinedActivity.findOne({
			where: { TagId: tagId, ActivityId: activityId },
			include: [{
				model: db.TagActivity,
				include: [{
					model: db.JoinedActivity
				}]
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
					profile: { id: userId },
					tag: { id: tagId }
				});
		});

	});
}


