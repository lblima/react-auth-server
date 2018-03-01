import authentication from './controllers/authentication';

export default (app) => {
    app.post("/signup", authentication.signup);
}