let mongoose = require('mongoose')
let Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

let UsersSchema = new Schema(
  {
    fName: { type: String },
    lName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
  },
  { collection: 'users' }
)

UsersSchema.statics.passwordMatches = function(password, hash) {
  return bcrypt.compareSync(password, hash)
}

UsersSchema.pre('save', function(next) {
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

module.exports = mongoose.model('User', UsersSchema)
