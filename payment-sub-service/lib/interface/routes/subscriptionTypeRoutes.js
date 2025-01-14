import express from 'express';
import { CreateSubscriptionPlan, EditPlan } from '../controller/SubscriptionTypeControllers/SubscriptionTypeController.js';
import { UserCreatePlan } from '../controller/userSubscription/UserSubscriptionController.js';

const router = express.Router();


router.put('/',EditPlan)
router.post('/plan',UserCreatePlan)
router.post('/',CreateSubscriptionPlan)


export default router