const express=require("express");
const { addStudent ,  getStudentByRollNo,  updateStudent, deleteStudent}=require("../controllers/studentController");
const router=express.Router();

router.post("/",addStudent)
router.get("/roll/:rollNo",getStudentByRollNo)
router.put("/roll/:rollNo",updateStudent)
router.delete("/roll/:rollNo",deleteStudent)
module.exports=router;