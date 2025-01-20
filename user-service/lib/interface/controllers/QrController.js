import EmailVerify from "../../use-cases/user/EmailVerify.js";
import GetAllUsers from "../../use-cases/user/GetAllUser.js";
import GetUser from "../../use-cases/user/GetUser.js";

import UserRepository from "../../infrastructure/repositories/UserRepository.js";
import RedisOtpRegistry from "../../infrastructure/cache/RedisOtpRepository.js";
import OtpUseCase from "../../use-cases/user/OtpUseCase.js";
import JwtAccessTokenManager from "../../infrastructure/security/JwtAccessTokenManager.js";

const userRepository = new UserRepository();
const redisOtpRegistry = new RedisOtpRegistry();
const jwtAccessTokenManager = new JwtAccessTokenManager();

const loginUser = new EmailVerify(userRepository);
const getUser = new GetUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const otpUseCase = new OtpUseCase(redisOtpRegistry);

class QrController {
  static async storeQR(req, res) {
    try {
      const { random } = req.body;
      if (!random) {
        return res.status(400).json({ message: "Random Number is needed" });
      }

      await otpUseCase.generateAndSaveOtp(random, false);

      res.status(200).json({ message: "stored email" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async validateQr(req, res) {
    try {
      const { id } = req.params;
      const verified = await otpUseCase.verifyKey(id);
      console.log("verifies>...", verified);
      if (verified == "false" || !verified) {
        res.status(200).json({ message: "Not validate" });
      } else {
        const payload = { email:verified };
        const accessToken = jwtAccessTokenManager.generate(payload, "1d");
        const refreshToken = jwtAccessTokenManager.generate(payload, "7d");
        const user = await getUser.execute(verified);
        const accessOptions = {
          expires: new Date(Date.now() + 15 * 60 * 1000),
          httpOnly: true,
          secure: false,
          sameSite: "None",
          path: "/",
        };

        const refreshOptions = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: false,
          sameSite: "None",
          path: "/refresh-token",
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
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async scanQr(req, res) {
    try {
      console.log("api comming .........from", req.user);
      const { id } = req.params;
      const verified = await otpUseCase.updateVal(id, req.user?.email);
      console.log(verified);
      if (verified) {
        res.status(200).json({ success: true, message: "Auth succesful" });
      } else {
        res.status(200).json({ message: "Auth failed" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default QrController;
