"use strict";
import IActivityService from "App/Service/Activities/IActivityService";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";
import HttpResponse from "Elucidate/HttpContext/ResponseType";

class UserActivityController {
  protected ActivityService: IActivityService;
  constructor(ActivityService: IActivityService) {
    this.ActivityService = ActivityService;
  }
  /**
   * Display a listing of the resource.
   */
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await this.ActivityService.getUserActivities(req.user["_id"])
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
   * Show the form for creating a new resource.
   *
   * @return Response
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
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

export default UserActivityController;
