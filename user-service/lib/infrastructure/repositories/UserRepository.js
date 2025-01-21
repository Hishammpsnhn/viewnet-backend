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

  async findById(id) {
    return await UserModel.findById(id);
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
    return await UserModel.aggregate([
      {
        $match: {
          isAdmin: false,
        },
      },
      {
        $lookup: {
          from: "sessions",
          localField: "email",
          foreignField: "userEmail",
          as: "userSessions",
        },
      },
      {
        $project: {
          email: 1,
          profilesCount: { $size: "$profiles" },
          isBlock: 1,
          sessionsCount: { $size: "$userSessions" },
        },
      },
    ]);
  }

  async updateById(id, updateData) {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default UserRepository;
