import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

 name:String,
 email:String,
 password:String,

 completedTopics:[String],

 scores:[Number]

})

export default mongoose.model("User",userSchema)