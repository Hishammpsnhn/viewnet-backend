import mongoose from "mongoose";
import UserSubscriptionType from "../../../domain/entities/UserSubscription.js";
import IUserSubscriptionPlanRepository from "../../../domain/interfaces/IUserSubscription.js";
import MongooseUserSubscriptionPlan from "../../database/models/UserSubscriptionModel.js";

export default class UserSubscriptionPlanRepository extends IUserSubscriptionPlanRepository {
  // Implement the persist method
  async persist(subscriptionEntity) {
    console.log(`Persisting subscription`, subscriptionEntity);
    const mongooseUserSubscription = new MongooseUserSubscriptionPlan({
      userId: subscriptionEntity.userId,
      plan: subscriptionEntity.plan,
      sessionLimit: subscriptionEntity.sessionLimit,
      status: subscriptionEntity.status,
      startDate: subscriptionEntity.startDate,
      endDate: subscriptionEntity.endDate,
    });
    await mongooseUserSubscription.save();
    console.log(mongooseUserSubscription);

    return mapToUserSubscriptionEntity(mongooseUserSubscription);
  }

  async findById(subscriptionId) {
    const mongooseUserSubscription =
      await MongooseUserSubscriptionPlan.findById(subscriptionId);
    return mapToUserSubscriptionEntity(mongooseUserSubscription);
  }
  async findByUserId(userId) {
    userId = userId.trim();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId format");
    }
    console.log("userid: " + userId);
    const data = await MongooseUserSubscriptionPlan.find({ userId: userId });
    const curDate = new Date();

    const mongooseUserSubscription =
      await MongooseUserSubscriptionPlan.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId if necessary
            status: "active", // Match only active subscriptions
            endDate: { $gte: curDate }, // Ensure endDate is greater than or equal to current date
          },
        },
      ]);

    console.log("mongooseUserSubscription: ", mongooseUserSubscription, data);
    return mapToUserSubscriptionEntity(mongooseUserSubscription[0]);
  }
}

function mapToUserSubscriptionEntity(mongooseUserSubscription) {
  if (!mongooseUserSubscription) {
    return null;
  }

  const subscription = new UserSubscriptionType({
    id: mongooseUserSubscription._id,
    userId: mongooseUserSubscription.userId,
    plan: mongooseUserSubscription.plan,
    sessionLimit: mongooseUserSubscription.sessionLimit,
    status: mongooseUserSubscription.status,
    endDate: mongooseUserSubscription.endDate,
    startDate: mongooseUserSubscription.startDate,
  });
  subscription.createdAt = mongooseUserSubscription.createdAt;
  subscription.updatedAt = mongooseUserSubscription.updatedAt;
  console.log("sub", subscription);
  return subscription;
}
