// data/repositories/ProfileRepository.js
import IProfileRepository from "../../domain/interfaces/IProfileRepository.js";
import UserModel from "../database/models/UserModel.js";

class ProfileRepository extends IProfileRepository {
  // Create a new profile for a user
  async createProfile(userId, profileData) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }
      const newProfile = user.profiles.create(profileData);
      console.log("newProfile", newProfile);
      user.profiles.push(newProfile);

      user.defaultProfile = newProfile._id;

      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Error creating profile: ${error.message}`);
    }
  }

  // Get a profile by userId
  async getProfileByUserId(userId) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      return user.profiles; // Return the profiles array for the user
    } catch (error) {
      throw new Error(`Error fetching profiles: ${error.message}`);
    }
  }

  async updateProfile(id, defaultProfile) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { defaultProfile },
        { new: true }
      );
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }
}

export default ProfileRepository;
