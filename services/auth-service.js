const jwt = require('jsonwebtoken')
let express = require('express')
let router = express.Router()

router.generateJWT = (user) => {
    const tokenData = {
        fName:user.fName, 
        lName:user.lName, 
        id: user._id, 
        email: user.email, 
        username: user.username
    }
    return token = jwt.sign( 
        tokenData , 
        process.env.SECRET_KEY, 
        {
            expiresIn: 8000
        })
}

module.exports = router