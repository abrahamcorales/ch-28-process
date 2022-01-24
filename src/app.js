import express from 'express'
import handlebars from 'express-handlebars'
import productRoute from './routes/productos.js'
import loginRoute from './routes/login.js'
import logoutRoute from './routes/logout.js'
import signupRoute from './routes/signup.js'
import routeInfo   from './routes/info.js'
import routeApis   from './routes/api.js'
import { fileURLToPath } from 'url';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import * as dotenv from 'dotenv'
import passport from './passport.js'
import path from 'path'; //! for use __dirname in ECMAScript modules
import yargs from 'yargs'
import os from 'os'
import cluster from 'cluster'

dotenv.config()

/*** yargs ***/
const argv = yargs(process.argv.slice(2)).argv
const port = argv.port || 8080
const mode = argv.mode || 'FORK'
console.log(`mode: ${mode} and port: ${port}`);

let totalCpu = mode === 'CLUSTER' ? os.cpus().length : 0

if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCpu}`);
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < totalCpu; i++) {
      cluster.fork();
    }
  
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  } else {
    console.log(`Worker ${process.pid} started`);

    const __filename = fileURLToPath(import.meta.url); //! for use __dirname in ECMAScript modules
    const __dirname = path.dirname(__filename); //! for use __dirname in ECMAScript modules
    const app = express()

    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.use(session({
    secret: process.env.SESSION_KEY,  
    store: MongoStore.create({mongoUrl:process.env.MONGO_STRING}),
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 600000,
        }
    }))
    app.use(passport.initialize())
    app.use(passport.session())


    app.set("views", "./src/views")
    app.set("view engine", "hbs")

    //setting for hbs
    app.engine(
        "hbs",
        handlebars({
            extname: "hbs",
            layoutsDir: __dirname + "/views/layouts",
            defaultLayout: "index",
            partialsDir: __dirname + "/views/partials"
        })
    );

    app.get('/' , (req , res)=>{
        if(!req.session.name){
            res.render("login")
        }else{
       res.render("formProductos") 
        }
    })

    app.use('/login',loginRoute)
    app.use('/signup',signupRoute)
    app.use('/logout',logoutRoute)
    app.use('/productos',productRoute)
    app.use('/info',routeInfo)
    app.use('/api',routeApis)


    app.listen(port,(error) =>{
        if (error){
            throw error
        }
        console.log(`running on ${port}`);
        })
    }