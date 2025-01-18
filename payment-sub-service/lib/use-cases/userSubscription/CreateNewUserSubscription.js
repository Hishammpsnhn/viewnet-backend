import UserSubscriptionType from "../../domain/entities/UserSubscription.js";

export default async (
  userId,
  planId,
  paymentIntent,
  { createNewPlanRepository, subscriptionPlanRepository, paymentGateway }
) => {
  console.log(
    createNewPlanRepository,
    subscriptionPlanRepository,
    userId,
    planId
  );
  if (!createNewPlanRepository || !subscriptionPlanRepository) {
    throw new Error("Missing  repository");
  }
  const planDetail = await subscriptionPlanRepository.findById(planId);
  const currentPlan = await createNewPlanRepository.findByUserId(userId);

  if (currentPlan) {
    throw new Error("User already have a subscription");
  }
  const paymentVerified = await paymentGateway.retrievePaymentIntent(paymentIntent);
  console.log("resssssssssssssssssssss", paymentVerified);
  const { name, sessionLimit, duration } = planDetail;
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);
  const userSubscription = new UserSubscriptionType({
    userId,
    sessionLimit,
    status: "active",
    endDate,
    startDate,
    plan: name,
  });
  console.log("last", userSubscription);
  const res = await createNewPlanRepository.persist(userSubscription);
  console.log("dd", res);
  return res;
};
