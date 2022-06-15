const User = require('../models/userModel')

module.exports = {

    setUser : async (req, res, next)=>{
       
        const auth = req.cookies.Auth

       if (auth) { 

        const currentUser = await User.findOne({email: auth})
        
        req.user = currentUser
          
        next()
       } else {
           req.user = null
          
           next()
       }
    }
}