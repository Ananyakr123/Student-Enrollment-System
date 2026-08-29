const express=require("express");
const { addCourse, getAllCourses , getCourses, updateCourses, deleteCourses}=require("../controllers/courseController");
const router=express.Router();

router.post("/",addCourse)
router.get("/",getAllCourses)
router.get("/:CourseID",getCourses)
router.put("/:CourseID",updateCourses)
router.delete("/:CourseID",deleteCourses)
module.exports=router;