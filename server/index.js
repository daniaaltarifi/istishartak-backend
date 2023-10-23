const express=require('express');
const app=express();
const db=require('./config/config')
const bodyParser=require('body-parser');
const mysql2=require('mysql2')
const cors=require('cors')
const multer=require("multer");
const path=require("path");
// const stayingHealthRoute=require('./Router/StayingHealthRoute.js')
const dotenv=require('dotenv')
dotenv.config(".env");
const PORT=process.env.PORT
// db()
app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('images'))
// const db=mysql2.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"istishartak"
// })
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})
app.post('/upload',upload.single('image'),(req,res)=>{
console.log(req.file)
//for db
const image=req.file.filename;
const sql='UPDATE users SET image = ?';
db.query(sql,[image],(err,result)=>{
    if(err) return res.json({messge:"Error"})
return res.json({Status:"succses"})
})
})
app.get('/getimage',(req,res)=>{
    const sql='select * from users';
    db.query(sql,(err,result)=>{
        if(err)return res.json("Error")
    return res.json(result)
    })
    res.send("hello world")
})

// app.use('/stayinghealth',stayingHealthRoute)
app.listen(8080,()=>{
    console.log(`server is running on port 8080`)
})