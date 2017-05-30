var messages = {
    new: 'User profile successfully created - sign in!',
    authFailed: 'That username/password combination does not match an account in our database'
}

module.exports = function (app) {
    app.get('/', function (req, res) {
        var message = null;
        if (req.query.m) {
            var message = messages[req.query.m]
        }
        res.render('index', {
            style: 'landing',
            message: message,
            status: req.query.m
        });
    });
}