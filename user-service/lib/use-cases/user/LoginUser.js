class LoginUser {
    constructor(userRepository, subscriptionGateway, sessionRepository) {
      this.userRepository = userRepository;
      this.subscriptionGateway = subscriptionGateway;
      this.sessionRepository = sessionRepository;
    }
  
    async execute(email) {
      const user = await this.userRepository.findByEmail(email);
      const planDetails = await this.subscriptionGateway.fetchSubscriptionDetails(
        user._id
      );
      const activeSessions = await this.sessionRepository.getSessionsByEmail(
        email
      );
      if (activeSessions.length >= planDetails.sessionLimit) {
        throw new Error("You have reached the maximum number of active devices.");
      }
      const newSession = await this.sessionRepository.save({
        email,
        deviceId: "new_device",
        token: new Date().getTime(),
      });
      console.log("new session",newSession)
      return { user, planDetails, newSession };
    }
  }
  
  export default LoginUser;
  