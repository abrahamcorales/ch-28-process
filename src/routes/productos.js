import { Router } from 'express';
import Cotainer from '../controllers/FileModule.js'
import userModel from '../data/mongo/userCollection.js'
import { authz } from '../middleware/authz.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url); //! for use __dirname in ECMAScript modules
const __dirname = path.dirname(__filename); //! for use __dirname in ECMAScript modules
const fileName = path.join (__dirname,'..','data','productos.txt')

const HandlerStock = new Cotainer(fileName)
const routes = new Router();

routes.get('/',authz,async (req,res)=>{
        let user = await userModel.findById(req.user._conditions._id);
        let products =  await HandlerStock.getAll() 
        let keys = Object.keys(products[0]).filter(pr=> pr !== 'id')
        res.render("productos",{data:products, keys:keys, name:user.email })      
})


routes.get('/upload',authz,async (req,res)=>{
    res.render("formProductos")      
})

routes.post('/',authz,async (req,res)=>{
    console.log(req.body);
    let result = await HandlerStock.save(req.body)
    !result && 
        res.status(400).send({error:'problemas en agregar el producto'})
    ||
        res.redirect('/productos')
})

export default routes
