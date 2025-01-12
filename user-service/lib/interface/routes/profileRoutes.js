import express from 'express';
import ProfileController from '../controllers/ProfileController.js';

const router = express.Router();




 router.post('/profile', ProfileController.createProfile);

export default router;