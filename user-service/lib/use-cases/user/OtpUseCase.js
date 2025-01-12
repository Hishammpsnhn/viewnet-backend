class OtpUseCase {
  constructor(otpRepository) {
    this.otpRepository = otpRepository;
  }
  async generateAndSaveOtp(key, value) {
    await this.otpRepository.saveOtp(key, value);
    return value;
  }

  async verifyOtp(key, value) {
    const storedOtp = await this.otpRepository.getOtp(key);

    if (storedOtp && storedOtp === value) {
      await this.otpRepository.deleteOtp(key);
      return true;
    }
    return false;
  }
  async verifyKey(key) {
    const storedVal = await this.otpRepository.getOtp(key);

    if (storedVal === "true") {
      await this.otpRepository.deleteOtp(key);
      return true;
    }
    return false;
  }
  async updateVal(key) {
    await this.otpRepository.saveOtp(key,"true");
    const res = await this.otpRepository.getOtp(key)
    console.log("storedval", res);
    if (res === "true") {
      return true;
    }
    return false;
  }
}

export default OtpUseCase;
