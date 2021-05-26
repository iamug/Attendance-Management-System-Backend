"use strict";
import IClockInService from "App/Service/ClockIn/IClockInService";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
import HttpResponse from "Elucidate/HttpContext/ResponseType";
import HomePageClockin from "App/Http/Requests/HomePageClockin_request";

class ClockInController {
  protected clockInService: IClockInService;
  constructor(ClockInService: IClockInService) {
    this.clockInService = ClockInService;
  }
  /**
   * Dashboard clockin
   * @Method POST
   * @API api/clockin
   * @return Response
   */
  saveLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let validate = await req.validate(req.body, {
        location: {
          long: "required|numeric",
          lat: "required|numeric",
        },
      });
      if (!validate["success"]) return HttpResponse.BAD_REQUEST(res, validate);
      return await this.clockInService
        .getLocation(req.user["_id"], validate["data"]["location"])
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
   * Homepage clockin.
   *
   * @Method POST
   * @API api/clockin/homepage
   * @return Response
   */
  homePageClockin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let validate = await HomePageClockin.validate(req.body);
      if (!validate["success"]) return HttpResponse.BAD_REQUEST(res, validate);
      return await this.clockInService
        .homePageClockin(
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

  /**
   * Store a newly created resource in storage.
   * @param  Request
   * @return Response
   */
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Display the specified resource.
   * @param  Request
   * @return Response
   */
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Show the form for editing the specified resource.
   * @param  Request
   * @return Response
   */
  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Update the specified resource in storage.
   * @param  Request
   * @return Response
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Remove the specified resource from storage.
   *
   * @param Request
   * @return Response
   */
  destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      return next(error);
    }
  };
}

export default ClockInController;
