import PasswordResetRepository from "App/Repository/PasswordResetRepository";
import IPasswordResetService from "./IPasswordResetService";
import LOG from "Elucidate/Log";
import IUserService from "../User/IUserService";
import EmailJob from "App/Jobs/Email_job";
import Hash from "Elucidate/Hashing/Hash";

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
  async sendResetEmail(email: string){
    let hash = await Hash.make(email);
    console.log("hash to PR table  ", hash);

    let payload = {
      client_name: "",
      sender_name: "FPG Hub",
      to: email,
      template: "Password_reset",
      from: "thehub@flexipgroup.com",
      subject: "Password Reset",
      body: "bodt",
      token: `http://localhost:3000/update-password?token=${hash}&email=${email}`,
    };

    try {
      const response = await this.createResetToken(
        email,
        hash,
        "60"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    new EmailJob().dispatch(payload);
  }
  async sendRegistrationEmail(payload: object){
    new EmailJob().dispatch(payload);
  }
}

export default PasswordResetService;
