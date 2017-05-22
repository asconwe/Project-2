module.exports = function (app) {
    app.get('/', function (req, res) {
        console.log('in landing route');
        res.render('index', { style: 'landing' })
    });
}