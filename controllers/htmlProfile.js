var db = require("../models");

function getUserProfile(username, callback) {
    // sequelize query here
    db.Person.findOne({ where: { username: username }, include: [db.Activity] }).then(function (profile) { 
        callback(profile);
    })
}

module.exports = function (app) {
    app.get('/profile', function (req, res) {
        // /profile?username=<username>
        var username = req.query.username;
        getUserProfile(username, function (profile) {
          db.UserAndActivity.findAll({ where: { PersonId: profile.id } }).then(function(userAndActivity){
            console.log('activity id', userAndActivity.id);
            // FOR EACH
            db.Activity.findAll({ where: { id: userAndActivity.ActivityId } }).then(function(activities){
              console.log(profile);
              console.log(activities);
              if (profile == null) {
                  res.render('index', {
                      style: 'landing',
                      authFailed: true
                  })
              } else {
                  res.render('profile', {
                      style: 'profile',
                      profile: profile,
                      activities: activities
                  });
              }
            });
          })
        })
    });
}