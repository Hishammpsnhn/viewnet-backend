class CreateProfile{
    constructor(profileRepository){
        this.profileRepository = profileRepository;
    }

    async execute(userId, profileData){
        return await this.profileRepository.createProfile(userId, profileData);
    }
} 

export default CreateProfile