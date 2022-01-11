export const authz = (req,res,next) => {
    if (req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/login')
    }
}