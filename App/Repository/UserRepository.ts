import User from "App/Model/User_model";
import NOSQLPD_Repository from "Elucidate/Repository/NOSQLPD_repository";

class UserRepository extends NOSQLPD_Repository {
  constructor() {
    super(User);
  }
}

export default UserRepository;
