
const express=require("express");
const { getMentors, addMentors, getMentorByID, updateMentor, deleteMentor}=require("../controllers/mentorController");
const router=express.Router();
router.get("/",getMentors);
router.get("/:MentorID",getMentorByID);
router.post("/",addMentors);
router.put("/:MentorID",updateMentor);
router.delete("/:MentorID",deleteMentor);
module.exports=router;