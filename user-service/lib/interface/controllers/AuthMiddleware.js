// import UserRepository from "../../infrastructure/repositories/UserRepositoryMongo.js";
import AccessTokenManager from "../../infrastructure/security/JwtAccessTokenManager.js";
import AuthenticateUser from "../../use-cases/AuthenticateUser.js";

// const userRepository = new UserRepository();
const accessTokenManager = new AccessTokenManager();

export async function isAuthenticated(req, res, next) {
  const token = await req.headers["authorization"]?.split(" ")[1];


  try {


    console.log("Checking token validity");
    const user = await AuthenticateUser(token, {
      accessTokenManager: accessTokenManager,
    });

     console.log("authenticated user", user);
    if (!user) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("not authenticated user", err);
    res.status(401).json({ message: err.message });
  }
}

