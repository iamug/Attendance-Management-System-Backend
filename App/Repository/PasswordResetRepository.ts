import PasswordReset from "App/Model/ResetPassword_model";
import NOSQLPD_Repository from "Elucidate/Repository/NOSQLPD_repository";

class PasswordResetRepository extends NOSQLPD_Repository {
  constructor() {
    super(PasswordReset);
  }
}

export default PasswordResetRepository;
