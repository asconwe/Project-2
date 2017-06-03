var messages = {
    new: 'User profile successfully created - sign in!',
    authFailed: 'That username/password combination does not match an account in our database'
}

module.exports = function (app) {
    //================= Listen for get requests on the / route
    app.get('/', function (req, res) {
        var message = null;
        // if there is a req.query.m, get that message from the messages object
        if (req.query.m) {
            var message = messages[req.query.m]
        }
        //================= Render landing page with a message if there is one
        res.render('index', {
            style: 'landing',
            message: message,
            status: req.query.m
        });
    });
}