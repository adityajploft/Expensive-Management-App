const express = require('express');
const {loginController,registerController} = require('../Controller/UserController')

// Router Object 
const router = express.Router()

// routers
// Post || LoginUser
router.post('/login' , loginController)

// Post || registerUser
router.post('/register' ,registerController)
// router.post('/login',async (req,res)=>{

// })
module.exports = router