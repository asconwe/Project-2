var db = require("../models");

function getUserProfile(username, callback) {
    // sequelize query here
    db.Person.findOne({ where: { username: username }, include: [{ model: db.Activity, include: [{ model: db.JoinedActivity }] }] }).then(function (profile) { 
        console.log('================================ profile', profile.dataValues.Activities, '==========================================');
        callback(profile);
    })
}

module.exports = function (app) {
    app.get('/profile', function (req, res) {
        // /profile?username=<username>
        var username = req.query.username;
        getUserProfile(username, function (profile) {
        //   db.JoinedActivity.findAll({ where: { PersonId: profile.id } }).then(function(joinedActivity){
        //     console.log('activity id', joinedActivity);
        //     // FOR EACH
        //     db.Activity.findAll({ where: { id: joinedActivity.ActivityId } }).then(function(activities){
            //   console.log(profile);
            //   console.log(activities);
              if (profile == null) {
                  res.render('index', {
                      style: 'landing',
                      authFailed: true
                  })
              } else {
                  res.render('profile', {
                      style: 'profile',
                      profile: profile,
                    //   activities: activities
                  });
              }
            // });
        //   })
        })
    });
}