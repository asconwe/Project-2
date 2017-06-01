var db = require("../models");

module.exports = function (app) {
	app.get("/allactivities/one/:tag", function (req, res) {
		db.TagActivity.findAll({
			where: { TagId: req.params.tag },
			include: [{ model: db.Activity }, { model: db.Tag }]
		}).then(function (result) {
			res.render('activities',
				{
					allActivities: false,
					activities: result,
					style: 'profile',
				});
			console.log(result);
		});

	});
}