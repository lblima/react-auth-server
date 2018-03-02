import mongoose from 'mongoose';
import bCrypt from 'bcrypt';

const Schema = mongoose.Schema;

// Define the model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
}, {
    collection: "Users"
});

// On save hook, encrypt password
userSchema.pre('save', function(next) { // is not possible to use arrows function here (I don´t know why)
    const user = this;
    
    bCrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);

        bCrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);

            user.password = hash;
            next();
        })
    });    
});

// Create the model class
const User = mongoose.model('User', userSchema);

// Export the model
export default User;