import mongoose from "mongoose";
const { Schema } = mongoose;

const userSubscriptionSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, unique: true, required: true  }, 
    plan: { type: String, required: true },
    sessionLimit: { type: Number, required: true, default: 1 }, 
    status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'active' }, 
    startDate: { type: Date, required: true, default: Date.now }, 
    endDate: { type: Date, required: true }, 
  },
  { timestamps: true }
);

const UserSubscriptionModel = mongoose.model("Subscription", userSubscriptionSchema);

export default UserSubscriptionModel;
