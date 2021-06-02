"use strict";
import Route from "Elucidate/Route/manager";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";

/*
    |--------------------------------------------------------------------------
    | Clockin Route File   
    |--------------------------------------------------------------------------
    | 
    */

Route.group("/clockin", () => {
  Route.post("/", "ClockInController@saveLocation", ["auth"]);
  Route.get("/check", "ClockInController@checkClockIn", ["auth"]);
  Route.post("/homepage", "ClockInController@homePageClockin");
});

//--------------------------------------------------------------------------
export default Route.exec;
