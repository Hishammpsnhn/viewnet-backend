import IUserRepository from "../../domain/interfaces/IUserRepository.js";
import UserModel from "../database/models/UserModel.js"; 

class UserRepository extends IUserRepository {
  async create(user) {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async createByEmail(email) {
    let user = await UserModel.findOne({ email });

    if (user) {
      return user;
    } else {
      user = await UserModel.create({ email });
      return user;
    }
  }

  async getAll() {
    return await UserModel.find();
  }
}

export default UserRepository;
