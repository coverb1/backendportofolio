import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import { portfo } from "./model.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const app= express()
app.use(express.json())
app.use(cors({
    origin:['https://mucyobruce.netlify.app',"http://localhost:5173"],
    credentials:true
}))

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('database connected well')
})

const PORT = 3000

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

app.post('/contact',async(req,res)=>{
const {name,email,message}=req.body
if (!name || !email || !message) {
   return res.status(401).json({message:"please provide your email and password"}) 
}
if (!email.includes('@')) {
    return res.status(401).json({message:"please write well email"})
}
try {
    const newcontact = new portfo({
        name,
        email,
        message
    })
    await newcontact.save()
        const mailoption ={
    from:process.env.SENDER_EMAIL,
    to:email,
    subject:"thank you for texting us",
    text:`hey sir/madam thank you for your time ${email} `
}
await transporter.sendMail(mailoption)
    return res.status(200).json({message: "thank you for texting us"})

} catch (error) {
  return res.status(500).json({error:error.message})  

  
}
})
app.listen(PORT,()=>{
console.log(`Serving is running on http://localhost:${PORT}`)
})