// import UserRepository from "../../infrastructure/repositories/UserRepositoryMongo.js";
import AccessTokenManager from "../../infrastructure/security/JwtAccessTokenManager.js";
import AuthenticateUser from "../../use-cases/AuthenticateUser.js";

// const userRepository = new UserRepository();
const accessTokenManager = new AccessTokenManager();

export async function isAuthenticated(req, res, next) {
  // check x-authenticated === 'true' in req.headers

  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token", token);
  try {
    const user = await AuthenticateUser(token, {
      //userRepository: userRepository,
      accessTokenManager: accessTokenManager,
    });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
}
