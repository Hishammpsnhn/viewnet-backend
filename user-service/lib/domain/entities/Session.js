class Session {
  constructor(userEmail, deviceId, token, createdAt) {
    this.userEmail = userEmail;
    this.deviceId = deviceId;
    this.token = token;
    this.createdAt = createdAt || new Date();
  }

  static create(userEmail, deviceId, token) {
    return new Session(userEmail, deviceId, token);
  }
}

export default Session;
