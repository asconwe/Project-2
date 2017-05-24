var db = require("../models");

function getUserProfile(username, callback) {
    console.log('in getUser')
    // sequelize query here
    db.Person.findOne({ where: { username: username }, include: [db.Activity] }).then(function (profile) { 
        callback(profile);
    })
}

module.exports = function (app) {
    app.get('/profile', function (req, res) {
        console.log('in get Router')
        // /profile?username=asdl
        var username = req.query.username;
        getUserProfile(username, function (profile) {
            if (profile == null) {
                res.render('index', {
                    style: 'landing',
                    authFailed: true
                })
            } else {
                res.render('profile', {
                    style: 'profile',
                    profile: profile
                });
            }
        })
    });
}