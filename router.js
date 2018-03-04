import authentication from './controllers/authentication';
import config from './config';
import passportService from './services/passport';
import passport from 'passport';

// Create a passport middleware
passportService.initializeJwtStrategy();
passportService.initializeLocalLogin();
const requireAuth = passportService.authenticateJwt();
const requireSign = passportService.authenticateLlocal();

export default (app) => {
    app.get("/", requireAuth, (req, res, next) => {
        res.send({ message: 'Hi there! Welcome to my React security app' });
    });
    app.post("/signup", authentication.signup);
    app.post("/signin", requireSign, authentication.signin);
}