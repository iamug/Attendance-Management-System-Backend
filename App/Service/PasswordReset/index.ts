import PasswordResetRepository from "App/Repository/PasswordResetRepository";
import IPasswordResetService from "./IPasswordResetService";
import LOG from "Elucidate/Log";
import IUserService from "../User/IUserService";
class PasswordResetService implements IPasswordResetService {
  protected userService: IUserService;
  constructor(UserService: IUserService) {
    this.userService = UserService;
  }
  async createResetToken(
    user_email: string,
    hash: string,
    period: string
  ): Promise<Boolean> {
    return await new Promise(async (resolve, reject) => {
      return await new PasswordResetRepository()
        .create({ email: user_email, hash, period })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          LOG.error("Service/PasswordReset", "error while creating token", err);
          reject(false);
        });
    });
  }
  async getUserByEmail(email: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let data = await new PasswordResetRepository().findOne({ email });
        console.log(data);
        
        if (data[0]) resolve({ status: true, data: data[0] });
        resolve({ status: false, data: "Data does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
}

export default PasswordResetService;
