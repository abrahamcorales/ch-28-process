import express from 'express'
import handlebars from 'express-handlebars'
import productRoute from './routes/productos.js'
import loginRoute from './routes/login.js'
import logoutRoute from './routes/logout.js'
import signupRoute from './routes/signup.js'
import { fileURLToPath } from 'url';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import * as dotenv from 'dotenv'
import passport from './passport.js'
dotenv.config()
import path from 'path'; //! for use __dirname in ECMAScript modules
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

const port = process.env.PORT || 8080

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


app.listen(port,(error) =>{
    if (error){
        throw error
    }
    console.log(`running on ${port}`);
})