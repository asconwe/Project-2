module.exports = function (app) {
    app.get('/activity/:activity', function (req, res) {
        res.render('activity', { activity: 'climb a mountain'});
    });
}