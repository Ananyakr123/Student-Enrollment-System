const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
    CourseID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
        required: true
    },
   description:{
        type:String,
        required:true,
        trim:true
    },
    duration:{
        type:String,
        required:true,
        trim:true
    },
    fee:{
        type:String,
        required:true,
        trim:true
    }
},
{
    timestamps:true
})
const Course=mongoose.model("Course",courseSchema);
module.exports=Course;