const Course= require('../models/course');
const addCourse=async(req,res)=>{
    try{
        const { CourseID,name , mentor, description, duration,fee}=req.body;
        if (!name || !description || !duration || !fee || !mentor ||!CourseID) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingCourse = await Course.findOne({ name });

        if (existingCourse) {
            return res.status(409).json({
                message: "Course already exists"
            });
        }
        const course=await Course.create({
            CourseID,
            name,
       mentor,
            description,
           duration,
       fee
        });
        res.status(201).json({
            success:true,
            message:"student address",
           course
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
const getAllCourses=async(req,res)=>{
    try {
        const response=await Course.find();
        if(!response){
            return res.status(404).json({
                message: "courses not found"
            });
        }
      
        res.status(200).json(response);
    }catch(e){
        res.status(500).json({
            sucess:false,
            message:e.message
        })
    }
}

const getCourses=async(req,res)=>{
    try{
        const response=await Course.findOne({CourseID:req.params.CourseID});
        if(!response){
            return res.status(404).json({
                message:"course not found"
            })
        }
        res.status(200).json(response);
    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}
const updateCourses=async(req,res)=>{
    try{
        const response =await  Course.findOneAndUpdate(
            {CourseID: req.params.CourseID},
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if(!response){
            res.status(404).json("not found");
        }
res.status(200).json("sucessfully updated");
    }catch(e){
        console.log(e);
    }
}
const deleteCourses=async(req,res)=>{
    try{
const response = await Course.findOneAndDelete({CourseID:req.params.CourseID});
if(!response){
    return res.status(404).json({
        success: false,
        message: "Course not found"
    });
}
res.status(200).json({
    success: true,
    message: "Course deleted successfully"
});
    }catch(e){
        res.status(500).json({
            message: "Failed to delete course",
            error: e.message
        });
       
    }
}
module.exports={ addCourse, getAllCourses, getCourses,updateCourses, deleteCourses};