import User from '../models/user';
import httpStatus from 'http-status';
import config from '../config';
import jwt from 'jwt-simple';

const tokenForUser = (user) => {
    const payload = {
        sub: user.id,
        iat: new Date().getTime()
    };

    return jwt.encode( payload, config.secret);
}

const auth = {
    signup: (req, res, next) => {        
        const email = req.body.email;
        const password = req.body.password;

        // Basic checking before continue
        if (!email || !password)
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: 'You must provide email and password' });

        // See if a user with a given email exists
        User.findOne({ email: email}, (err, existingUser) => {
            if (err)
                return next(err);

            // if a user with email does exists, return error
            if (existingUser)
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: 'email is in use'});

            // If a user with email NOT exists, create and save  user record
            const user = new User({
                email: email,
                password: password
            });

            user.save((err) => {
                if (err)
                    return next(err);

                res.json({ token: tokenForUser(user) });
            });

            // Respond to request indicating the user was created
        });       
    },
    signin: (req, res, next) => {
        res.send({ token: tokenForUser(req.user) });
    }
} 

export default auth;