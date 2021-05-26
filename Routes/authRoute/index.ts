
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

    Route.post("/reset-password", "Auth/LoginController@reset");
    
    module.exports = Route.exec;
    