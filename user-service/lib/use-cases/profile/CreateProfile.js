class CreateProfile{
    constructor(profileRepository){
        this.profileRepository = profileRepository;
    }

    async execute(userId, profileData){
        return await this.profileRepository.create(userId, profileData);
    }
} 