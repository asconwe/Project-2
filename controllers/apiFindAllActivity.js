var db = require("../models");

module.exports = function(app) {
  app.get("/api/allactivities", function(req, res) {
        db.Activity.findAll({
        	include: [{
	    		model: db.TagActivity,
	    		include:[{
	    			model: db.Tag
	    		}] 
	    	}]
	    }).then(function(dballactivities) {
          res.render('activities', 
          {
          	allacitivies: true,
          	activities: dballactivities,
          	style: 'profile',
           });
          	console.log(dballactivities);
       });

  });
}
