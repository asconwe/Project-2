function getUserProfile() { 
    
}

module.exports = function (app) {
    app.get('/profile', function (req, res) {
        // /profile?username=asdl
        var username = req.query.username
        getUserProfile(username, function (profile) { 
            res.render('profile', {
                style: 'profile',
                profile: profile
            });
        })
    });
}