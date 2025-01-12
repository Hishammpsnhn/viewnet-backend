import mongoose from "mongoose";

const ProfilesSchema = new mongoose.Schema(
  {
    adulth: { type: Boolean, required: true },
    username: { type: String, required: true },
    profilePic: { type: String, required: true },
    watchHistory: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("Profiles", ProfilesSchema);

export default ProfileModel;
