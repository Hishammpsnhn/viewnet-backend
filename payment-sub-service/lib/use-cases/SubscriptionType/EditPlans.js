export default async function (id, data, { subscriptionPlanRepository }) {
  const plan = await subscriptionPlanRepository.findById(id);
  if (!plan) throw new Error("No subscription plans");

  plan.setActive(data.isActive);
  plan.setName(data.name);
  plan.setDescription(data.description);
  plan.setPrice(data.price);
  plan.setSessionLimit(data.sessionLimit);
  plan.setDuration(data.duration);
  plan.setFeatures(data.features);
  
  return subscriptionPlanRepository.merge(plan);
}
