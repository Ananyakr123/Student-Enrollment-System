const express=require('express');
const router=express.Router();
const {login,signUp} = require('../controllers/authentication')
router.post('/login',login);
router.post('/signup',signUp);
module.export=router;