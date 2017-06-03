var db = require("../models");

module.exports = function (app) {
// <<<<<<< HEAD
	//================= Listen for a get request and return the activity information
	app.get("/api/activity/edit/:id", function (req, res) {
		db.Activity.findOne({
			where: {
				id: req.params.id
			},
			include: [db.TagActivity]
		}).then(function (dbActivity) { 
			res.json(dbActivity);
		})
	})
	// The information from the first request populates on the client's text fields
	// Then the user edits the information and clicks submit
	//================= Listen for the updated information
	app.put("/api/activity/edit/:id", function (req, res) {
		console.log(req.body);
		db.Activity.update(req.body, {
			where: {
				id: req.params.id
			}
		}).then(function (Activity) {
			//================= Return user to their profile where updated activity information will populate
			res.redirect('/profile?key=id&val=' + req.body.PersonId);
		});
	});
}
// =======
//   app.post("/api/activity/edit", function (req, res) {
//     var activity = req.body;
//     var tagArr=[];
//     for (var item in activity) {
//       if (isNaN(parseInt(activity[item]))){
//         console.log("not a number");
//       }
//       else {
//         tagArr.push(activity[item]);
//       }
//     }
// //remove final index in array that is not a tag
//     tagArr.splice(-1,1);
//     db.Activity.findOne({where:{ActivityId: dbActivity.id}}).then(function (dbeditActivity) {
//     	db.Activity.update(activity).then(function (dbeditActivity) {
// 			console.log(dbActivity.id);
// 			for(var i=0; i<tagArr.length; i++) {
// 			db.TagActivity.update({ ActivityId: dbActivity.id, TagId: tagArr[i] });
// 			}
// 			db.JoinedActivity.update({ ActivityId: dbActivity.id, PersonId: req.body.PersonId }).then(function (userAndActivity) {
//         		res.redirect('/profile?key=id&val=' + req.body.PersonId);
//     		});
//    		});
//   	});
// });
// }			
// >>>>>>> 5a76f881b8315ef90eb85f52b89b94ebe3872f7d
