"use strict";
import Route from "Elucidate/Route/manager";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";

/*
    |--------------------------------------------------------------------------
    | Clockout Route File   
    |--------------------------------------------------------------------------
    | 
    */

Route.group("/clockout", () => {
  Route.post("/", "ClockOutController@dashboardClockout", ["auth"]);
  Route.post("/homepage", "ClockOutController@homePageClockout");
});

//--------------------------------------------------------------------------
export default Route.exec;
