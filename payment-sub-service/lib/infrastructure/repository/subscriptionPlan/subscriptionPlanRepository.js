import SubscriptionType from "../../../domain/entities/SubscriptionType.js";
import ISubscriptionPlanRepository from "../../../domain/interfaces/ISubscriptionPlan.js";
import MongooseSubscription from "../../database/models/SubscriptionModel.js";

export default class SubscriptionPlanRepository extends ISubscriptionPlanRepository {
  // Implement the persist method
  async persist(subscriptionEntity) {
    const {
      name,
      description,
      price,
      sessionLimit,
      duration,
      features,
      isActive,
    } = subscriptionEntity;

    const mongooseSubscription = new MongooseSubscription({
      name,
      description,
      price,
      sessionLimit,
      duration,
      features,
      isActive,
    });
    await mongooseSubscription.save();

    return mapToSubscriptionEntity(mongooseSubscription);
  }

  async merge(PlanEntity) {
    console.log("planEntity", PlanEntity);
    const modifiedFields = PlanEntity.getModifiedFields();
    console.log("modifiedFields", modifiedFields);
    if (Object.keys(modifiedFields).length === 0) {
      return; // No modifications to update
    }

    const updateFields = {};
    for (const field in modifiedFields) {
      if (modifiedFields[field]) {
        updateFields[field] = PlanEntity[field];
      }
    }

    await MongooseSubscription.findByIdAndUpdate(PlanEntity.id, updateFields);

    PlanEntity.clearModifiedFields();
    return PlanEntity;
  }

  async find() {
    const plans = await MongooseSubscription.find();
    return plans.map((plan) => mapToSubscriptionEntity(plan));
  }
  async findById(id) {
    const plan = await MongooseSubscription.findById(id);
    return mapToSubscriptionEntity(plan);
  }
}

function mapToSubscriptionEntity(mongooseSubscription) {
  if (!mongooseSubscription) {
    return null;
  }

  const subscription = new SubscriptionType(
    mongooseSubscription._id,
    mongooseSubscription.name,
    mongooseSubscription.description,
    mongooseSubscription.price,
    mongooseSubscription.duration,
    mongooseSubscription.sessionLimit,
    mongooseSubscription.features,
    mongooseSubscription.isActive
  );

  subscription.createdAt = mongooseSubscription.createdAt;
  subscription.updatedAt = mongooseSubscription.updatedAt;

  return subscription;
}
