import SubscriptionType from "../../../domain/entities/SubscriptionType.js";
import ISubscriptionPlanRepository from "../../../domain/interfaces/ISubscriptionPlan.js";
import MongooseSubscription from "../../database/models/SubscriptionModel.js";

export default class SubscriptionPlanRepository extends ISubscriptionPlanRepository {

  async persist(subscriptionEntity) {
    const {
      name,
      description,
      price,
      sessionLimit,
      duration,
      features,
      isActive,
      uhd,
      live,
      ads
    } = subscriptionEntity;

    const mongooseSubscription = new MongooseSubscription({
      name,
      description,
      price,
      sessionLimit,
      duration,
      features,
      isActive,
      uhd,
      live,
      ads
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
    const plans = await MongooseSubscription.find({isActive: true});
    return plans.map((plan) => mapToSubscriptionEntity(plan));
  }
  async findById(id) {
    console.log("id", id);
    const plan = await MongooseSubscription.findOne({_id:id, isActive: true});
    if (!plan) {
      throw new Error('Subscription not found or inactive');
    }
    console.log(plan)
  
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
    mongooseSubscription.sessionLimit,
    mongooseSubscription.duration,
    mongooseSubscription.features,
    mongooseSubscription.isActive,
    mongooseSubscription.uhd,
    mongooseSubscription.live,
    mongooseSubscription.ads
  );
  subscription.createdAt = mongooseSubscription.createdAt;
  subscription.updatedAt = mongooseSubscription.updatedAt;

  return subscription;
}
