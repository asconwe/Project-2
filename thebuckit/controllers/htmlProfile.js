var db = require("../models");

//================= Get the current users profile from the database, and pass to the callback function
function getUserProfile(res, key, val, callback) {
    // Initialize query object
    var queryObj = {
        username: { username: val },
        id: { id: val }
    }
    //================= Find one user by their username or id
    db.Person.findOne({
        where: queryObj[key],
        include: [{
            model: db.Activity,
            include: [{ // Also get their owned activities
                model: db.TagActivity,
                include: [db.Tag] // Also get each activity's tags
            }]
        }, {
            model: db.JoinedActivity, // Also get their joined activity ids
        }]
    }).then(function (profile) {
        if (profile == null) { // If there is no profile for that usernamee or password
            res.redirect('/?m=authFailed'); // Redirect to homepage with authFailed message
        } else {
            var tags = []; // will store all the activity's tags
            var joinedActivityIds = []; // will store the IDs of any joined activities
            var activityIds = ['a']; // will store the IDs of any owned activities
            // initialized with 'a' so that it is never passed to sequelize as null and 'a' will never be a joined activity id
            if (profile != null) { // If there is a profile --> Is this necessary?
                profile.Activities.forEach(function (activity) {
                    activity.TagActivities.forEach(function (tagObj) {
                        tags.push(tagObj) // Add each tag for this activity to the tag array
                    })
                    activityIds.push(activity.id); // Add each activity ID
                })
                profile.JoinedActivities.forEach(function (activity) {
                    joinedActivityIds.push(activity.ActivityId); // Add each activity ID
                })
            }
            //================= Find all activities that are in the joined activities but not the owned activities
            db.Activity.findAll({
                where: {
                    id: {
                        $in: joinedActivityIds, // that have one of these IDs
                        $notIn: activityIds // but not one of these IDs
                    }
                },
                include: [{ // Include the tags
                    model: db.TagActivity,
                    include: [db.Tag]
                }]
            }).then(function (joinedActivities) {
                // make joinedActivities more acessible for handlebars template
                profile.joinedActivities = joinedActivities;
                callback(profile, tags);
            });
        }
    })
}

module.exports = function (app) {
    //================= Listen for get request on profile route
    app.get("/profile", function (req, res) {
        var userId = req.query.id;
        console.log(userId);
        db.Tag.findAll({
            include: [{
                model: db.TagActivity,
                include: [db.Activity]
            }]
        }).then(function (dballtags) {
            var allTags = [];
            for (i = 0; i < dballtags.length; i++) {
                var object = {};
                object.id = dballtags[i].id;
                object.tag = dballtags[i].tag;
                allTags.push(object);
            }
            /// Requests should always come with a profile key and value
            // /profile?key=username&val=<username>
            // or /profile?key=id&val=<id>
            var val = req.query.val;
            var key = req.query.key;
            //================= Get the user's profile
            getUserProfile(res, key, val, function (profile, tags) {
                //================= Render the template with the profile data
                res.render('profile', {
                    profile: profile,
                    allTags: allTags,
                    style: 'profile',
                    PersonId: profile.id
                });
            });
        });

    });
}
