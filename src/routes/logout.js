import { Router } from 'express';

const routes = new Router();

routes.post('/',(req,res) =>{
    let name = req.session.name
    req.session.destroy();
    res.render('logout',{name:name})
})

export default routes