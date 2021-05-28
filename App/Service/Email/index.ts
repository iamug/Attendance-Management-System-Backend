import IEmailService from "./IEmailService";
import LOG from "Elucidate/Log";
import IUserService from "../User/IUserService";
import IMailer from "App/Mailer/IMailer";
import UserRepository from "App/Repository/UserRepository";

class EmailService implements IEmailService {
  protected userService: IUserService;
  mailer: IMailer;
  constructor(UserService: IUserService, Mailer: IMailer) {
    this.userService = UserService;
    this.mailer = Mailer;
  }

  async sendEmail(user_id: string): Promise<String> {
    return await new Promise(async (resolve, reject) => {
      return "Email Sent";
    });
  }
}

export default EmailService;
