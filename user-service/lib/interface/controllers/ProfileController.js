import ProfileRepository from '../../infrastructure/repositories/ProfileRepository.js';
import CreateProfile from '../../use-cases/profile/CreateProfile.js';

const profileRepository = new ProfileRepository();

const createProfile = new CreateProfile(profileRepository);

class ProfileController{
    static async createProfile(req,res){
        try{

            const {userId, profileData} = req.body;
            if(!userId ||!profileData){
                return res.status(400).json({message: "userId and profileData are required"});
            }
            const createdProfile = await createProfile.execute(userId, profileData);
            res.status(201).json(createdProfile);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }
}

export default ProfileController;