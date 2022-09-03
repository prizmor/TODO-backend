const {Schema, model} = require('mongoose');

const User = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: { type: String, required: true },
    confirmedEmail: { type: Boolean, required: true, default: false },
    uuid: { type: String, required: true },
    emailCode: { type: String, required: false }
});

module.exports = model('User', User);