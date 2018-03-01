import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define the model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
}, {
    collection: "Users"
});

// Create the model class
const User = mongoose.model('User', userSchema);

// Export the model
export default User;