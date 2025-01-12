import IProfileRepository from "../../domain/interfaces/IProfileRepository.js";
import ProfileModel from "../database/models/ProfileModel.js";

class ProfileRepository extends IProfileRepository {
  async createProfile(userId, profileData) {
    const newProfile = new ProfileModel.findByIdAndUpdate(userId, profileData);
    console.log(newProfile);
    return newProfile;
  }
}
export default ProfileRepository