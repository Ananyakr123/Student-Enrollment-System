const express=require('express');
const router=express.Router();
const {login,signUp} = require('../controllers/authentication')
router.get("/test", (req, res) => {
    res.json({ message: "Auth route is working" });
  });
  
router.post("/login", login);
router.post("/signup", signUp);
module.exports=router;