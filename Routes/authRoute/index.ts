
    "use strict";
    import Route from "Elucidate/Route/manager" 
    
    /*
    |--------------------------------------------------------------------------
    | Authentication Route File   
    |--------------------------------------------------------------------------
    |
    | This route handles both login and registration.
    | 
    */
    
    Route.post("/register", "Auth/RegisterController@register");
    
    Route.post("/login", "Auth/LoginController@login");

    Route.post("/reset-password", "Auth/ResetPasswordController@reset");
    
    Route.post("/update-password", "Auth/ResetPasswordController@updatePassword");
    
    module.exports = Route.exec;
    