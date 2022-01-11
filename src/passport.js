import passport from "passport";
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt';
import userModel from '../src/data/mongo/userCollection.js'
const LocalStrategy = passportLocal.Strategy;
const saltRounds = 10;
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await userModel.findOne({email: email});
    if(!user) {
      return done(null, false);
    }
    if(!bcrypt.compareSync(password,user.password)){
        return done(null, false); 
    }

    return done(null, user);
  }));

passport.use("local-signup",new LocalStrategy({
    usernameField : "email",
    passwordField : "password",
    passReqToCallback : true
    
},async (req,email,password,done)=>{

    let user = await userModel.findOne({email:email})

    if(user){
        console.log('usuario ya existe');
        return done(null,false)
    }
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password,salt)
    let newuser = await userModel.create({email:email,password:hash})
    done(null, newuser);
}))


passport.serializeUser( (user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=>{
    let user = userModel.findById(id)
      done(null, user);
})

export default passport