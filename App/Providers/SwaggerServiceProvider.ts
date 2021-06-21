"use strict";
import ServiceProvider from "Elucidate/Support/ServiceProvider";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import options = require("../../swagger.json");

class SwaggerServiceProvider extends ServiceProvider {
  /**
   * Register application services.
   */
  register() {
    //
  }

  /**
   * Bootstrap any application services.
   * @return void
   */
  boot() {
    let app = this.app.use("Application");
    let specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  }
}

export default SwaggerServiceProvider;
