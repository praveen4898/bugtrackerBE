const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    avatar: { type: String, default: null },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});;


const UserModel=mongoose.model('User', userSchema);

module.exports={
    UserModel
}