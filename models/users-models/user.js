let mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Define user model schema
const UserSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true
    },
    lName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    authyId: { type: String, default: process.env.ACCOUNT_SECURITY_API_KEY },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      trim: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email!'
      }
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  { collection: 'authyUsers' }
)

UserSchema.set('timestamps', true)

UserSchema.pre('save', function(next) {
  let user = this

  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return Promise.reject(err)
    }
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      user.password = hashedPassword
      next()
    })
  })
})

module.exports = mongoose.model('UserAuthy', UserSchema)
