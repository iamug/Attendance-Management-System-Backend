"use strict";
import IClockOutService from "App/Service/ClockOut/IClockOutService";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
import HttpResponse from "Elucidate/HttpContext/ResponseType";
import HomePageClockout from "App/Http/Requests/HomePageClockinout_request";

class ClockOutController {
  protected clockOutService: IClockOutService;
  constructor(ClockOutService: IClockOutService) {
    this.clockOutService = ClockOutService;
  }

  /**
   * Dashboard clockin
   * @Method POST
   * @API api/clockin
   * @return Response
   */
  dashboardClockout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let validate = await req.validate(req.body, {
        location: {
          long: "required|numeric",
          lat: "required|numeric",
        },
      });
      if (!validate["success"]) return HttpResponse.BAD_REQUEST(res, validate);
      return await this.clockOutService
        .dashboardClockOut(req.user["_id"], validate["data"]["location"])
        .then((result) => {
          return HttpResponse.OK(res, result);
        })
        .catch((err) => {
          return HttpResponse.EXPECTATION_FAILED(res, err);
        });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Homepage clockout.
   *
   * @Method POST
   * @API api/clockout/homepage
   * @return Response
   */
  homePageClockout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let validate = await HomePageClockout.validate(req.body);
      if (!validate["success"]) return HttpResponse.BAD_REQUEST(res, validate);
      return await this.clockOutService
        .homePageClockOut(
          validate["data"]["email"],
          validate["data"]["location"]
        )
        .then((result) => {
          return HttpResponse.OK(res, result);
        })
        .catch((err) => {
          return HttpResponse.EXPECTATION_FAILED(res, err);
        });
    } catch (error) {
      return next(error);
    }
  };
}

export default ClockOutController;
