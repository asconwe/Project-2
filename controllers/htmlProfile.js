function getUserProfile(username, callback) {
    console.log('in getUser')
    // sequelize query here
    var profile = {
        username: username,
        activity: [
            {
                itemName: 'Go skydiving',
                location: 'Virginia',
                complete: false
            },
            {
                itemName: 'Go Bungee Jumping',
                location: 'Virginia',
                complete: true
            }
        ]
    } // this would come fromt he sequelize query
    callback(profile);
}

module.exports = function (app) {
    app.get('/profile', function (req, res) {
        console.log('in get Router')
        // /profile?username=asdl
        var username = req.query.username;
        getUserProfile(username, function (profile) {
            console.log('in callback')
            res.render('profile', {
                style: 'profile',
                profile: profile
            });
        })
    });
}