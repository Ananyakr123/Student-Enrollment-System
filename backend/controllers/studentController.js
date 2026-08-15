const Student= require("../models/Student");
const addStudent=async(req,res)=>{
    try{
        const { name , phone, email, rollNo,course}=req.body;
        const student=await Student.create({
            name,
            phone,
            email,
            rollNo,
            course
        });
        res.status(201).json({
            success:true,
            message:"student address",
            student
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


const getStudentByRollNo = async (req, res) => {
  try {
      const student = await Student.findOne({
          rollNo: req.params.rollNo
      });

      if (!student) {
          return res.status(404).json({
              message: "Student not found"
          });
      }

      return res.status(200).json(student);

  } catch (error) {
      return res.status(500).json({
          success: false,
          message: error.message
      });
  }
};

const updateStudent = async (req, res) => {
  try {
      const student = await Student.findOneAndUpdate(
          { rollNo: req.params.rollNo },
          req.body,
          {
              new: true,
              runValidators: true
          }
      );

      if (!student) {
          return res.status(404).json({
              message: "Student not found"
          });
      }

      return res.status(200).json(student);

  } catch (error) {
      console.log("UPDATE ERROR:", error);

      return res.status(500).json({
          message: "Error updating student",
          error: error.message
      });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      rollNo: req.params.rollNo
  });

      if (!student) {
          return res.status(404).json({
              message: "Student not found"
          });
      }

      return res.status(200).json(student);

  } catch (error) {
      console.log("UPDATE ERROR:", error);

      return res.status(500).json({
          message: "Error updating student",
          error: error.message
      });
  }
};


module.exports={ addStudent, getStudentByRollNo,updateStudent,deleteStudent};