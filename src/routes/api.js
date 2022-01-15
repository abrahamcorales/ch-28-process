
import { Router } from 'express';
import { fork } from 'child_process'


let data = {}
const routes = new Router();

routes.get('/randoms',async (req,res) =>{
    
    let cant = req.query.cant ? req.query.cant : 100000000
    const child = fork("./src/controllers/child.js",[cant]);
    
    child.on("message", function (message) {
        res.send(`${message}`)
      });
})

export default routes
