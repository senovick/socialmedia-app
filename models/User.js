import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    createdAt: String
});

const User = model("User", userSchema);

export default User;