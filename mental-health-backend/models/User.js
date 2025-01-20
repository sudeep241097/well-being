import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (err) {
        console.error('Error hashing password:', err.message);
        next(err); // Pass the error to the next middleware
    }
});


const User = mongoose.model('User', userSchema);
export default User;
