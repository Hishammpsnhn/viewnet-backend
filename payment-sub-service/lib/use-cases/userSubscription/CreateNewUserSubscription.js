import UserSubscriptionType from "../../domain/entities/UserSubscription.js";

export default async (data, { createNewPlanRepository }) => {
  const { userId, startDate, plan, sessionLimit, status, endDate } = data;
  console.log(userId, startDate, createNewPlanRepository);
  if (!createNewPlanRepository) {
    throw new Error("Missing User subscription repository");
  }
  const userSubscription = new UserSubscriptionType({
    userId,
    sessionLimit,
    status,
    endDate,
    startDate,
    plan,
  });
  console.log("last", userSubscription);
  const res = await createNewPlanRepository.persist(userSubscription);
  console.log("dd", res);
  return res
};
