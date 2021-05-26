"use strict";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
import HttpResponse from "Elucidate/HttpContext/ResponseType";
import FormRequest from "Elucidate/Validator/FormRequest";

class ResetPasswordController {
  reset = async (req: Request, res: Response) => {
    let validation = await this.validator(req.body);
    if (validation.success) {
      return await this.processReset(req.body, res);
    } else {
      return HttpResponse.BAD_REQUEST(res, validation);
    }
  };

  private processReset = async (data: object, res: Response) => {};

  private validator = (record: object) => {
    return FormRequest.make(record, {
      email: "required|string|email|max:255",
    });
  };
}

export default ResetPasswordController;
