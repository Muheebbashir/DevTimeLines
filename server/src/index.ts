import express from 'express';

const app=express();

app.get("/",(req,res)=>{
    res.send("Server Is Running");
})

app.listen(5000,()=>{
    console.log("Server is Running on Port 5000");
})
