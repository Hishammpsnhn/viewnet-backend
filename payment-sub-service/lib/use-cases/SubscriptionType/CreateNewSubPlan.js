import SubscriptionType from "../../domain/entities/SubscriptionType.js";

export default async (
  name,
  description,
  price,
  sessionLimit,
  duration,
  features,
  isActive,
  { subscriptionPlanRepository }
) => {

  if (!subscriptionPlanRepository) {
    throw new Error("Missing required dependency: subscriptionPlanRepository");
  }

  if (!subscriptionPlanRepository.persist) {
    throw new Error(
      "Persist method is not available on subscriptionPlanRepository"
    );
  }

  if (!name || !description || !price || !sessionLimit || !duration ||!isActive || !features) {
    throw new Error("Missing required parameters");
  }

  const subscription = new SubscriptionType(
    null,
    name,
    description,
    price,
    sessionLimit,
    duration,
    features,
    isActive
  );
  console.log("subscription: " + subscription);
  return subscriptionPlanRepository.persist(subscription);
};
