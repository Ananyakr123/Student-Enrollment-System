const mongoose=require('mongoose');
const mentorSchema=new mongoose.Schema({
  MentorID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name:  {
        type:String,
        required:true,
        trim:true
    },
  phone:  {
        type:String,
        required:true,
        trim:true
    },
    email:  {
        type:String,
        required:true,
        trim:true
    },
    highest_Education:  {
        type:String,
        required:true,
        trim:true
    },
 experience:  {
        type:String,
        required:true,
        trim:true
    },
   salary:  {
        type:String,
        required:true,
        trim:true
    },
    courses:{
        type:Array,
        required:true,
        trim:true
    }
},{
    timestamps:true
})
const Mentor =mongoose.model("Mentor" ,mentorSchema);
module.exports=Mentor;