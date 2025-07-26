import mongoose, {Schema} from "mongoose";

const portfolioschema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true}
})

export const portfo= mongoose.model("portofolio",portfolioschema)