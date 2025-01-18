import CreateNewUserSubscription from "../../../use-cases/userSubscription/CreateNewUserSubscription.js";
import UserNewPlanRepository from "../../../infrastructure/repository/userSubscription/userSubsciption.js";
import SubscriptionPlanRepository from "../../../infrastructure/repository/subscriptionPlan/subscriptionPlanRepository.js";
import paymentGateway from "../../../infrastructure/Stripe/PaymentGateway.js";

const createNewPlanRepository = new UserNewPlanRepository();
const subscriptionPlanRepository = new SubscriptionPlanRepository();
const PaymentGateway = new paymentGateway();
export async function UserCreatePlan(req, res) {
  console.log(req.body);
  const { userId, planId ,paymentIntent} = req.body;
  try {
    const userPlan = await CreateNewUserSubscription(userId, planId,paymentIntent, {
      createNewPlanRepository: createNewPlanRepository,
      subscriptionPlanRepository: subscriptionPlanRepository,
      paymentGateway: PaymentGateway,

    });
    res.status(200).json({ message: true, userPlan });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
}
