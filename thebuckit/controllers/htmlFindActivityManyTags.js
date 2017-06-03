var db = require("../models");

module.exports = function (app) {
	app.get("/allactivities/many/:tags", function (req, res) {
		//get tagIds from req.params.tags
		var tagIds = []
		db.Activity.findAll({
			where: { TagId: { $in: tagIds }},
			include: [{ model: db.Activity }, { model: db.Tag }]
		}).then(function (dballactivities) {
			res.render('activities',
				{
					allActitivies: true,
					activities: dballactivities,
					style: 'profile',
				});
			console.log(dballactivities);
		});

	});
}
