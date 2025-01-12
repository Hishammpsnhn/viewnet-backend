import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();


router.get('/test', (req, res) => {
    console.log(req.headers);
    res.send("API is working")
});

// router.post('/register', AuthController.register);
 router.post('/login', AuthController.login);
 router.post('/otpVerify', AuthController.verifyOtp);
// router.get('/users', AuthController.getAllUsers);

export default router;