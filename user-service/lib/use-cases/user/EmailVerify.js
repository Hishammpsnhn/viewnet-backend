// import jwt from 'jsonwebtoken';
import User from "../../domain/entities/User.js";
import IUserRepository from "../../domain/interfaces/IUserRepository.js";
import sendNotificationToQueue from "../../infrastructure/queue/setup.js";

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, otp) {
    let user;
    user = await this.userRepository.findByEmail(email);

    if (!user) {
      user = await this.userRepository.createByEmail(email);
    } else {
      if (user.isBlock) {
        throw new Error("User is blocked");
      }
    }
    await sendNotificationToQueue(email, "notificationDetails.subject", otp);

    return user;
  }
}

export default LoginUser;
