import { Router } from 'express';
import passport from '../passport.js';
const routes = new Router();

routes.get('/',(req,res) =>{
    
    res.render('signup')
})

routes.get('/signupfail',(req,res) =>{
    
    res.render('signupfail')
})

routes.post('/',passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/signup/signupfail",
}))

export default routes