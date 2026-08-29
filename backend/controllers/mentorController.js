const Mentor= require('../models/mentor');
const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
  
        if (mentors.length === 0) {
            return res.status(404).json({
                message: "No mentors found"
            });
        }
  
        return res.status(200).json(mentors);
  
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
  };
  const addMentors=async(req,res)=>{
    try{
        const {MentorID, name,phone, email, highest_Education,experience, salary, courses}=req.body;
        if (!name || !phone || !email|| !highest_Education || !experience ||!MentorID ||!courses)  {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const mentor = await Mentor.create( {
MentorID,
name,
phone,
email,
highest_Education,
experience,
salary,
courses
        });
        res.status(201).json({
            success:true,
            message:"mentor added",
            mentor
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });}
    } 
  const getMentorByID=async(req,res)=>{
    try {
        console.log(req.params);
        const mentor = await Mentor.findOne({
            MentorID: req.params.MentorID
        });
    
        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found"
            });
        }
    
        res.status(200).json({
            success: true,
            mentor
        });
    
    } catch (e) {
        console.log(e);
    
        res.status(500).json({
            success: false,
            message: "Error finding mentor",
            error: e.message
        });
    }
  }
  const updateMentor=async(req,res)=>{
    try{
        const data=await Mentor.findOneAndUpdate({
            MentorID:req.params.MentorID
        },
    req.body,
{
    new:true,
    runValidators:true
});
if(!data){
    res.status(404).json({
        success: false,
        error:e.message
    } )
    return;
}
res.status(200).json({
    success:true,
    message:"updated successfully"
})

    }catch(e){
        res.status(500).json({
            success: false,
            message: "Error finding mentor",
            error: e.message
        });
    }
  }

  const deleteMentor=async(req,res)=>{
    try{
        const response = await Mentor.findOneAndDelete({MentorID:req.params.MentorID});
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Mentor not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "mentor deleted successfully"
        });
            }catch(e){
                res.status(500).json({
                    message: "Failed to delete mentor",
                    error: e.message
                });
  }}
  module.exports={getMentors,addMentors ,getMentorByID, updateMentor,deleteMentor};