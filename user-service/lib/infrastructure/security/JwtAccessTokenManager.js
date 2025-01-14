
import jwt from 'jsonwebtoken';
import IAccessTokenManager from '../../domain/interfaces/IAccessTokenManager.js';

// todo: to .env!
const JWT_SECRET_KEY = "shhhh";

export default class JwtAccessTokenManager extends IAccessTokenManager {

    generate(payload, expiry) {
        return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: expiry });
    }

    decode(accessToken) {
        try {
            return jwt.verify(accessToken, JWT_SECRET_KEY);
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return null;
        }
    }
}