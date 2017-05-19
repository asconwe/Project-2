module.exports = function (app) { 
    app.get('/', function (req, res) {
        res.render('index', { style: 'landing' })
    });

    app.get('/profile', function (req, res) { 
        res.render('profile', {
            style: 'profile'
        });
    });
}