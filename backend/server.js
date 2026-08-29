const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const studentRoutes = require("./routes/studentRoutes");  
const courseRoutes = require("./routes/courseRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const reportRoutes = require("./routes/reportRoutes");  

//this tells dot.env package to read .env file 
dotenv.config();
const app=express();
connectDB();

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.json({
        message :"student backend server is running"
    });
});


app.use("/api/students", studentRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/reports",reportRoutes);

const PORT=process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log("server listening to "+PORT);
})
