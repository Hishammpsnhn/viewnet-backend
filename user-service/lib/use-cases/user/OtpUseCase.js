class OtpUseCase {
  constructor(otpRepository) {
    this.otpRepository = otpRepository;
  }
  async generateAndSaveOtp(email, otp) {
    await this.otpRepository.saveOtp(email, otp);
    return otp;
  }

  async verifyOtp(key, otp) {
    const storedOtp = await this.otpRepository.getOtp(key);

    if (storedOtp && storedOtp === otp) {
      await this.otpRepository.deleteOtp(key);
      return true;
    }
    return false;
  }
}

export default OtpUseCase;
