import EmailVerify from "../../use-cases/user/EmailVerify.js";
import GetAllUsers from "../../use-cases/user/GetAllUser.js";
import GetUser from "../../use-cases/user/GetUser.js";
import LoginUser from "../../use-cases/user/LoginUser.js";
import axios from "axios";
import UserRepository from "../../infrastructure/repositories/UserRepository.js";
import SessionRepository from "../../infrastructure/repositories/SessionRepository.js";
import RedisOtpRegistry from "../../infrastructure/cache/RedisOtpRepository.js";
import OtpUseCase from "../../use-cases/user/OtpUseCase.js";
import JwtAccessTokenManager from "../../infrastructure/security/JwtAccessTokenManager.js";
import SubscriptionGateway from "../../gateway/SubscriptionGateway.js";

const userRepository = new UserRepository();
const redisOtpRegistry = new RedisOtpRegistry();
const jwtAccessTokenManager = new JwtAccessTokenManager();
const subscriptionGateway = new SubscriptionGateway(axios);
const sessionRepository = new SessionRepository();

const loginUser = new EmailVerify(userRepository);
const getUser = new GetUser(
  userRepository,
  subscriptionGateway,
  sessionRepository
);
const userLogin = new LoginUser(
  userRepository,
  subscriptionGateway,
  sessionRepository
);
const getAllUsers = new GetAllUsers(userRepository);
const otpUseCase = new OtpUseCase(redisOtpRegistry);

class UserController {
  static async getMe(req, res) {
    try {
      console.log("req.user", req.user);
      if (!req.user) {
        return res.status(400).json({ message: "Token is required" });
      }
      const { user, planDetails } = await getUser.execute(req.user.email);

      res.status(200).json({
        success: true,
        user,
        planDetails,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async login(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpRes = await otpUseCase.generateAndSaveOtp(email, otp);
      let user = await loginUser.execute(email, otp);

      res.status(200).json({ message: "otp sent to email" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }

      const verified = await otpUseCase.verifyOtp(email, otp);
      if (verified) {
        const payload = { email };
        const accessToken = jwtAccessTokenManager.generate(payload, "15m");
        const refreshToken = jwtAccessTokenManager.generate(payload, "7d");
        const {user} = await userLogin.execute(email);
        const accessOptions = {
          maxAge: 15 * 60 * 1000, // 7 days
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
          path: "/",
        };

        const refreshOptions = {
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
          path: "/",
        };
        res
          .status(200)
          .cookie("accessToken", accessToken, accessOptions)
          .cookie("refreshToken", refreshToken, refreshOptions)
          .json({
            success: true,
            accessToken,
            refreshToken,
            user,
          });
      } else {
        res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await getAllUsers.execute();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async refreshToken(req, res) {
    const { refreshToken } = req.body;
    console.log("refresh token>>>>>", refreshToken);
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    const decoded = jwtAccessTokenManager.decode(refreshToken);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    console.log(decoded);
    const payload = { email: decoded.email };
    const accessToken = jwtAccessTokenManager.generate(payload, "15m");
    const accessOptions = {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      path: "/",
    };
    res.status(200).cookie("accessToken", accessToken, accessOptions).json({
      success: true,
      accessToken,
    });
  }
}

export default UserController;
