export default async function (
  planId,
  userId,
  { subscriptionPlanRepository, paymentGateway, createNewPlanRepository }
) {
  const plan = await subscriptionPlanRepository.findById(planId);
  if (!plan) throw new Error("No subscription plans in this Id");

  const currentPlan = await createNewPlanRepository.findByUserId(userId);
  if (currentPlan) {
    throw new Error("User already have a subscription");
  }

  const paymentResult = await paymentGateway.processPayment({
    amount: plan.price,
    currency: "usd",
    userId,
    planId,
  });
  if (!paymentResult) {
    throw new Error("Payment failed: " + paymentResult.error);
  }
  return paymentResult;
}
