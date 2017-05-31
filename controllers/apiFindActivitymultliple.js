var db = require("../models");

module.exports = function(app) {
  	app.get("/api/activity/:ta", function(req, res) {
	    db.Activity.findAll({
	    	where:{
		    	TagId:req.body.TagIdArr
		    	}
	    }).then(function(result) {
	      console.log(req.body);
	    });
	});
}
