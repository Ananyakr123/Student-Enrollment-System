const Student=require("../models/Student")
const Course = require("../models/course");
const Mentor = require("../models/mentor");

const getNumericData=async(req, res)=>{
try{
    const totalStudents=await Student.countDocuments();
    const totalCourses = await Course.countDocuments();

    const totalMentors = await Mentor.countDocuments();
    const feeResult = await Course.aggregate([
        {
            $group: {
                _id: null,
                averageFee: { $avg: "$fee" }
            }
        }
    ]);

    const averageCourseFee =
        feeResult.length > 0
            ? feeResult[0].averageFee
            : 0;

            res.status(200).json({
                success: true,
                totalStudents,
                totalCourses,
                totalMentors,
                averageCourseFee}
            );
}catch(e){
console.log(e);
res.status(500).json(
{
     success: false,
            message: "Failed to fetch report summary"
}

)
}
}
module.exports={ getNumericData}