var db = require("../models");

module.exports = function (app) {
	//================= Listen for get requests on the /allactivities route
	app.get("/allactivities", function (req, res) {
		// get the userId from req.query
		var userId = req.query.id;
		//================= Get all activities, their tags and there joinedActivities
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
				//================= If the user has already joined an acivity, mark it as joined
				dbAllActivities[index].joined = false;
				activity.JoinedActivities.forEach(function (participant) {
					if (parseInt(participant.PersonId) === parseInt(userId)) {
						dbAllActivities[index].joined = true;
					}
				});
			});
			//================= Render activities page with all activities and the user id
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
