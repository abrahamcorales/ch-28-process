
import { Router } from 'express';
import { authz } from '../middleware/authz.js';
import passport from '../passport.js';

const routes = new Router();

routes.get('/',(req,res) =>{
    
    res.render('login')
})

routes.get('/loginfail',(req,res) =>{
    
    res.render('loginfail')
})

routes.post('/',passport.authenticate("local-login", {
    successRedirect: "/productos",
    failureRedirect: "/login/loginfail",
}))


export default routes
