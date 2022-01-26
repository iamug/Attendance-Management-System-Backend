"use strict";
import IUserService from "App/Service/User/IUserService";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
import HttpResponse from "Elucidate/HttpContext/ResponseType";
import FormRequest from "Elucidate/Validator/FormRequest";
import IPasswordResetService from "App/Service/PasswordReset/IPasswordResetService";
import Hash from "Elucidate/Hashing/Hash";
import PasswordResetRepository from "App/Repository/PasswordResetRepository";
import moment from "moment";

class ResetPasswordController {
  protected userService: IUserService;
  protected passwordResetService: IPasswordResetService;
  constructor(
    UserService: IUserService,
    PasswordResetService: IPasswordResetService
  ) {
    this.userService = UserService;
    this.passwordResetService = PasswordResetService;
  }

  reset = async (req: Request, res: Response) => {
    let validation = await this.validator(req.body);
    if (validation.success) {
      return await this.processReset(req.body, res);
    } else {
      return HttpResponse.BAD_REQUEST(res, validation);
    }
  };

  private processReset = async (data: object, res: Response) => {
    let userDetails = await this.userService.getUserByEmail(data["email"]);
    if (!userDetails["status"]) {
      return HttpResponse.BAD_REQUEST(res, {
        error: true,
        message: "User not found",
      });
    }
    this.passwordResetService.sendResetEmail(data["email"]);

    return HttpResponse.OK(res, {
      error: false,
      message: "Password reset link sent",
    });
  };

  updatePassword = async (data: object, res: Response) => {
    const getUser = await this.passwordResetService.getUserByEmail(
      data["body"].email
    );
    let hours = moment().diff(moment(getUser["data"].createdAt), "hours");
    
    if (hours > 1) {
      return HttpResponse.BAD_REQUEST(res, {
        error: true,
        message: "Token Expired",
      });
    }

    let hash = await Hash.make(data["body"].password);

    if (getUser["data"].hash === data["body"].token) {
      await this.userService.updateUserByEmail(data["body"].email, hash);

      await new PasswordResetRepository().deleteWhere({
        email: data["body"].email,
      });
      return HttpResponse.OK(res, {
        error: false,
        message: "Password updated successfully",
      });
    } else {
      return HttpResponse.BAD_REQUEST(res, {
        error: true,
        message: "Invalid Authentication",
      });
    }
  };

  private validator = (record: object) => {
    return FormRequest.make(record, {
      email: "required|string|email|max:255",
    });
  };
}

export default ResetPasswordController;
