import Hash from "Elucidate/Hashing/Hash";
import FormRequest from "Elucidate/Validator/FormRequest";
import { Request, Response } from "Elucidate/HttpContext";
import HttpResponse from "Elucidate/HttpContext/ResponseType";
import Authenticator from "Elucidate/Auth/Authenticator";
import EmailJob from "App/Jobs/Email_job";
import IPasswordResetService from "App/Service/PasswordReset/IPasswordResetService";

class RegisterController {
  protected Auth: Authenticator;
  protected passwordResetService: IPasswordResetService;

  constructor(
    Authenticator: Authenticator,
    PasswordResetService: IPasswordResetService
  ) {
    this.Auth = Authenticator;
    this.passwordResetService = PasswordResetService;
  }

  /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation of their token.
    |
    */
  register = async (req: Request, res: Response) => {
    let validation = await this.validator(req.body);
    if (validation.success) {
      return await this.create(req.body, res);
    } else {
      return HttpResponse.BAD_REQUEST(res, validation);
    }
  };

  /**
   * Get a validator for an incoming registration request.
   * @param {object} record
   * @return Validator
   */
  private async validator(record: object) {
    return await FormRequest.make(record, {
      firstname: "required|string|max:255",
      lastname: "required|string|max:255",
      email: "required|string|email|max:255",
      password: "required|string|min:8",
    });
  }

  /**
   * Create a new user instance after a valid registration.
   * @param {object} data
   * @param {Response} res
   * @return User
   */
  private create = async (data: object, res: Response) => {
    data["password"] = await Hash.make(data["password"]);
    return await this.Auth.createUser(data)
      .then(async (user: any) => {
        let token = await this.Auth.generateToken(user);
        let userDetails = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          avatar: user.avatar,
        };
        let payload = {
          client_name: user.firstname + " " + user.lastname,
          sender_name: "FPG Hub",
          to: user.email,
          template: "Register_user",
          from: "thehub@flexipgroup.com",
          subject: "Welcome onboard",
        };

        this.passwordResetService.sendRegistrationEmail(payload);

        return HttpResponse.OK(res, {
          auth: true,
          token: token,
          user: userDetails,
        });
      })
      .catch((err: { msg: any; payload: any }) => {
        return HttpResponse.UNAUTHORIZED(res, {
          auth: false,
          msg: err.msg,
          error: err,
        });
      });
  };
}

export default RegisterController;
