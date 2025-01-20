// repositories/SessionRepository.js
import Session from '../../domain/entities/Session.js'
import  SessionModel from '../database/models/SessionModel.js'

class SessionRepository {
  async getSessionsByEmail(userEmail) {
    return await SessionModel.find({ userEmail });
  }

  async save(session) {
    const sessionModel = new SessionModel({
      userEmail: session.email,
      deviceId: session.deviceId,
      token: session.token,
    });
    return await sessionModel.save();
  }

  async deleteSession(userEmail, deviceId) {
    return await SessionModel.deleteOne({ userEmail, deviceId });
  }
}

export default SessionRepository;
