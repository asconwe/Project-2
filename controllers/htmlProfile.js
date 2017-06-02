var db = require("../models");

function getUserProfile(res, key, val, callback) {
    var queryObj = {
        username: { username: val },
        id: { id: val }
    }
    db.Person.findOne({
        where: queryObj[key],
        include: [{
            model: db.Activity,
            include: [{
                model: db.TagActivity,
                include: [db.Tag]
            }]
        }, {
            model: db.JoinedActivity,
              
        }]
    }).then(function (profile) {
        if (profile == null) {
            res.redirect('/?m=authFailed');
        } else {
            var tags = [];
            var joinedActivityIds = [];
            var activityIds = ['a'];
            if (profile != null) {
                profile.Activities.forEach(function (activity) {
                    activity.TagActivities.forEach(function (tagObj) { 
                        tags.push(tagObj)
                    })
                    activityIds.push(activity.id);
                })
                profile.JoinedActivities.forEach(function (activity) {
                    joinedActivityIds.push(activity.ActivityId);
                })
            }
            db.Activity.findAll({
                where: {
                    id: {
                        $in: joinedActivityIds,
                        $notIn: activityIds
                    }
                },
                include: [{
                    model: db.TagActivity,
                    include: [db.Tag]
                }]    
            }).then(function (joinedActivities) {

                profile.joinedActivities = joinedActivities;
                callback(profile, tags);
            });
        }
    })
}

module.exports = function (app) {
    app.get("/profile", function (req, res) {
        var userId = req.query.id;
        console.log(userId);
        db.Tag.findAll({
            include: [{
                        model: db.TagActivity,
                        include: [db.Activity]
                    }]   
        }).then(function (dballtags) {
            var allTags= [];
            for (i=0; i<dballtags.length; i++) {
                var object={};
                object.id=dballtags[i].id;
                object.tag=dballtags[i].tag;
                allTags.push(object);
            }
            var val = req.query.val;
             var key = req.query.key;
            getUserProfile(res, key, val, function (profile, tags) {
                res.render('profile', {
                    profile: profile,
                    allTags: allTags,
                    style: 'profile',
                    PersonId: profile.id
                 });
            });
console.log("did it work?");
console.log(allTags);
        });

    });
}
