
const authGuard = (req, res, next) =>{
    if (req.user !== null) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {authGuard}