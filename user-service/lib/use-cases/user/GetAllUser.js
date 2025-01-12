class GetAllUsers {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute() {
      return await this.userRepository.getAll();
    }
  }
  
  export default GetAllUsers;
  