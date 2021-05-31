"use strict";
import Route from "Elucidate/Route/manager";
import { Request, Response, NextFunction } from "Elucidate/HttpContext";

/*
    |--------------------------------------------------------------------------
    | Clockout Route File   
    |--------------------------------------------------------------------------
    | 
    */

Route.group("/activities", () => {
  Route.get("/", "UserActivityController@getAll", ["auth"]);
});

//--------------------------------------------------------------------------
export default Route.exec;
