export default (app) => {

    app.route('/')
        .get((req, res, next) => {
            res.send(['waterbottle', 'phone', 'paper']);
        });
}