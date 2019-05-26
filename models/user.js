'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')


const UserSchema = Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true },
    uvus: String,
    password: String,
    group: String,
    evaluations: [Boolean],
    optionalEvaluations: [Boolean],
    ps: { type: [String], enum: ['P', 'S'] },
    signupDate: { type: Date, default: Date.now() },
})

UserSchema.pre('save', function(next) {
    let user = this
    // if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    //console.log(this)
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

UserSchema.methods.gravatar = function() {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `http://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)