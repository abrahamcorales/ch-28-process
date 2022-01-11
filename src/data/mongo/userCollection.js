import mongoose from 'mongoose'
import * as dotenv from 'dotenv';
dotenv.config()

mongoose.connect(process.env.MONGO_STRING , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))

const registroScheme = mongoose.Schema(
    { email: { type:String, require: true},
      password: { type:String, require: true}
    })

const userModel = mongoose.model('usuarios',registroScheme)

export default userModel