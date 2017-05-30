var db = require("../models");

function getUserProfile(key, val, callback) {
    var queryObj = {
        username: { username: val },
        id: { id: val }
    }
    db.Person.findOne({ where: queryObj[key], include: [{ model: db.Activity }, { model: db.JoinedActivity }] }).then(function (profile) {
        console.log('Activities ===================================', profile.Activities, profile.JoinedActivities);
        var joinedActivityIds = [];
        var activityIds = [];
        if (profile.Activities != []) {
            profile.Activities.forEach(function (activity) {
                activityIds.push(activity.id);
            })
            profile.JoinedActivities.forEach(function (activity) {
                joinedActivityIds.push(activity.id);
            })
        }
        console.log('next')
        db.Activity.findAll({ where: { id: { $in: joinedActivityIds, $notIn: activityIds } } }).then(function (joinedActivities) {
            console.log('then')
            profile.joinedActivities = joinedActivities;
            console.log('finally')
            callback(profile);
        });

    })
}

module.exports = function (app) {
    app.get('/profile', function (req, res) {
        // /profile?key=username&val=<username>
        // or /profile?key=id&val=<id>
        var val = req.query.val;
        var key = req.query.key
        getUserProfile(key, val, function (profile) {
            if (profile == null) {
                res.redirect('/?m=authFailed');
            } else {
                res.render('profile', {
                    style: 'profile',
                    profile: profile
                });
            }

        })
    });
}