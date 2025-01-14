export default async function (id, data, { subscriptionPlanRepository }) {
  const plan = await subscriptionPlanRepository.findById(id);
  if (!plan) throw new Error("No subscription plans");

  plan.setActive(data.isActive);
  console.log("Subscription plans", plan);
  return subscriptionPlanRepository.merge(plan);
}
