class UpdateProfile {
  constructor(profileRepository) {
    this.profileRepository = profileRepository;
  }

  async execute(id, defaultProfile) {
    return await this.profileRepository.updateProfile(id, defaultProfile);
  }
}
export default UpdateProfile;
