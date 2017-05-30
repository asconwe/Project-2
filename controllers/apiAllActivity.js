var db = require("../models");

module.exports = function(app) {
  app.get("/api/allactivities", function(req, res) {
        db.Activity.findAll().then(function(dballactivities) {
          res.json(dballactivities);
        });
      }
  )
};
