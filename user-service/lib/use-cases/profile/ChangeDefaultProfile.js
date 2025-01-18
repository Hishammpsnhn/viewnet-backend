class CreateProfile{
    constructor(profileRepository) {
      this.profileRepository = profileRepository;
    }
  
    async execute(userId, profileData) {
      return await this.profileRepository.changeDefaultProfile(userId, profileData);
    }
  }
  
  export default CreateProfile;
  