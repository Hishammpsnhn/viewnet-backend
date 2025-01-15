import express from 'express';
import { CreateSubscriptionPlan, EditPlan, GetAllPlans } from '../controller/SubscriptionTypeControllers/SubscriptionTypeController.js';
import { UserCreatePlan } from '../controller/userSubscription/UserSubscriptionController.js';

const router = express.Router();

router.get('/',GetAllPlans)
router.put('/',EditPlan)
router.post('/plan',UserCreatePlan)
router.post('/',CreateSubscriptionPlan)


export default router