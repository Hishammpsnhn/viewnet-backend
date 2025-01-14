import mongoose from "mongoose";
const { Schema } = mongoose;

const subscriptionTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, //eg:basic
    description: { type: String },
    price: { type: Number, required: true }, 
    sessionLimit: { type: Number, required: true }, 
    duration: { type: Number, required: true }, //  eg:30 day
    features: [{ type: String }], 
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SubscriptionTypeModel = mongoose.model("SubscriptionPlans", subscriptionTypeSchema);

export default SubscriptionTypeModel;
