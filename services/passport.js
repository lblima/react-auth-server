import passport from 'passport';
import {
    Strategy as JwtStrategy,
    ExtractJwt
} from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from '../models/user';
import config from '../config';

// Create JWT strategy ====================================================
// payload = decoded JWT Token
// done = callback function

// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

const jwtLoginStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if the user id in payload exists on our database. 
    // If it does, call done with the user, otherwise call done without user object
    User.findById(payload.sub, (err, user) => {
        if (err)
            return done(err, false);

        if (user)
            done(null, user);
        else
            done(null, false);
    });
});

// Create local strategy ===============================================
const localOptions = {
    usernameField: 'email', // The default field is userName, that´s why we need provide explicity the email
    passwordField: 'password' // We don´t need provide this password, it´s a default field
};

const localLoginStrategy = new LocalStrategy(localOptions, (email, password, done) => {
    // Verify email and password, call done with user if user email and password was correct, otherwise call done with false
    User.findOne({
        email: email
    }, (err, user) => {
        if (err)
            return done(err);

        if (user) {
            // Compare password
            console.log(password);
            user.comparePassword(password, (err, isMatch) => {
                if (err)
                    return done(err);
                
                if (!isMatch)
                    return done(null, false);
                
                return done(null, user);
            })

        } else {
            return done(null, false)
        }
    })
});

// Tell Passport to use the previous created Strategy
export default {
    initializeJwtStrategy: () => passport.use(jwtLoginStrategy),
    initializeLocalLogin: () => passport.use(localLoginStrategy),
    authenticateJwt: () => passport.authenticate('jwt', { session: false }), // We use session false, because passport by default try to create a cookie based session
    authenticateLlocal: () => passport.authenticate('local', { session: false })
}