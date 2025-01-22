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

  const paymentVerified = await paymentGateway.retrievePaymentIntent(
    paymentIntent
  );

  if (paymentVerified) {
    const { plan_id, user_id } = paymentVerified.metadata;
    const currentPlan = await createNewPlanRepository.findByUserId(user_id);
    if (currentPlan) {
      throw new Error("User already have a subscription");
    }
    const planDetail = await subscriptionPlanRepository.findById(plan_id);
    const { name, sessionLimit, duration } = planDetail;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration);

    const userSubscription = new UserSubscriptionType({
      userId,
      sessionLimit:sessionLimit,
      status: "active",
      endDate,
      startDate,
      plan: name,
    });

    const res = await createNewPlanRepository.persist(userSubscription);
    return res;
  }
};
