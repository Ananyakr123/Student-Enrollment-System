const express =require('express');

const {getNumericData} =require("../controllers/reportController");
const router=express.Router()
router.get("/", getNumericData);
module.exports=router;
