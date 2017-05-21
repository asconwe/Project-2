var helper = require('utilities/helper.js');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { style: 'landing' })
    });

    app.get('/profile', function (req, res) {
        // /profile?username=asdl
        var username = req.query.username
        var profile = helper.getUserProfile(username)
        if (helper.hasAccount(username)) {
            res.render('profile', {
                style: 'profile',
                profile: profile
            });
        }
    });

    app.get('/:activity', function (req, res) {

        activity = helper.getActivity(req.query.activity) {

        }
    });
}