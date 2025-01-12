import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileIds: [[{ type: Schema.Types.ObjectId }]],
    subscription: { type: Schema.Types.ObjectId },
    Admin: { type: Boolean, default: false, required: true },
    Block: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
