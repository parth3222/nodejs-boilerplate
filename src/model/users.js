const mongoose = require('mongoose');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({

    firstName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    image: { type: String }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function (password, salt, orignalPassword) {
    var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return orignalPassword === hash;
};

const User = mongoose.model('User', userSchema);

module.exports = User;