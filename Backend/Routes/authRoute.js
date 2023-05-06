import express from 'express';
const router = express.Router();
import {registerController,
    loginController,
    forgetPasswordController}
from '../controllers/authController.js';
import { auth, isAdmin } from '../middleware/authMiddleware.js';


// Path: Routes\authRoute.js
router.post('/register', registerController);
router.post('/login',loginController);
router.post('/admin',auth,isAdmin,(req,res)=>{
    res.send('Welcome to Deshboard');
});

// User Auth || Get Request
router.get('/user-auth',auth,(req,res)=>{
    res.send({ok : true});
});

// admin Auth || Get Request
router.get('/admin-auth',auth,(req,res)=>{
    res.send({ok : true});
});


// Forget Password || Post Request
router.post('/forget-password',forgetPasswordController); 



router.get('/deshboard',auth,(req,res)=>{
    res.send('Welcome to DESHBOARD');
});



export default router;