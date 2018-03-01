import User from '../models/user';
import httpStatus from 'http-status';

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
                
                res.json({ success: 'true' });
            });

            // Respond to request indicating the user was created
        });       
    }    
} 

export default auth;