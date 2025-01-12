import express from 'express';
import ProfileController from '../controllers/ProfileController.js';
import { isAuthenticated } from '../controllers/AuthMiddleware.js';

const router = express.Router();




 router.post('/profile',isAuthenticated, ProfileController.createProfile);

export default router;