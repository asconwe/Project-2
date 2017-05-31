var db = require("../models");

module.exports = function(app) {
  	app.get("/api/allactivities/:tag", function(req, res) {
	    db.TagActivity.findAll({
	    	where:{TagId:req.params.tag},
	    	include: [{
	    		model: db.Activity},
	    	{
	    		model: db.Tag
	    	}]
	    }).then(function(result) {
	    	console.log(result);
	    	console.log(result[0].Activity);
	    	console.log(result[0].Tag);
	      res.render('activities', 
          {
          	allactivities:false,
          	activities: result,
          	style: 'profile',
           });
          	console.log(result);
       });

  });
}