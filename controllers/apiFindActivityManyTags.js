var db = require("../models");

module.exports = function(app) {
  	app.get("/api/allactivities/:TagIdArr", function(req, res) {
	    db.Activity.findAll({
	    	where:{TagId:req.body.TagIdArr}
	    }).then(function(result) {
	      console.log(req.body);
	      	res.render('activities', {
	      		activities: 'result'
	      	});
	    });
	});
}
