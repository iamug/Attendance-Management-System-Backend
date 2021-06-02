"use strict";
import EmailJob from "App/Jobs/Email_job";
import IUserService from "App/Service/User/IUserService";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
import HttpResponse from "Elucidate/HttpContext/ResponseType";
import FormRequest from "Elucidate/Validator/FormRequest";
import IPasswordResetService from "App/Service/PasswordReset/IPasswordResetService";
import Hash from "Elucidate/Hashing/Hash";
import PasswordResetRepository from "App/Repository/PasswordResetRepository";

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
    let hash = await Hash.make(userDetails["data"].email);
    console.log("hash to PR table  ", hash);

    let payload = {
      client_name: "",
      sender_name: "FPG Hub",
      to: userDetails["data"].email,
      template: "Password_reset",
      from: "thehub@flexipgroup.com",
      subject: "Password Reset",
      body: "bodt",
      token: `localhost:3000/update-password?token=${hash}&email=${userDetails["data"].email}`,
    };

    try {
      const response = await this.passwordResetService.createResetToken(
        userDetails["data"].email,
        hash,
        "60"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    new EmailJob().dispatch(payload);

    return HttpResponse.OK(res, {
      error: false,
      message: "Password reset link sent",
    });
  };

  updatePassword = async (data: object, res: Response) => {
    const getUser = await this.passwordResetService.getUserByEmail(
      data["body"].email
    );
    let hash = await Hash.make(data["body"].password);
    console.log("hash from DB  ", getUser["data"].hash);
    console.log("hash from frontend", data["body"].token);

    if (getUser["data"].hash === data["body"].token) {
      const userUpdate = await this.userService.updateUserByEmail(
        data["body"].email,
        hash
      );
      console.log(userUpdate);
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
