import express from "express";
import AuthController from "../controllers/AuthController.js";
import QrController from "../controllers/QrController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("API is working");
});

// router.post('/register', AuthController.register);
router.get('/qr/:id',QrController.validateQr)
router.get('/qr/scan/:id',QrController.scanQr)
router.post("/qr", QrController.storeQR);
router.post("/login", AuthController.login);
router.post("/otpVerify", AuthController.verifyOtp);
// router.get('/users', AuthController.getAllUsers);

export default router;
