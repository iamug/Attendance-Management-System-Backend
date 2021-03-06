import ServiceProvider from "Elucidate/Support/ServiceProvider";
import Authenticator from "Elucidate/Auth/Authenticator";
import ClockInService from "App/Service/ClockIn";
import PasswordResetService from "App/Service/PasswordReset";
import ClockOutService from "App/Service/ClockOut";
import UserService from "App/Service/User";
import Mailer from "App/Mailer";
import ActivityService from "App/Service/Activities";

class AppServiceProvicer extends ServiceProvider {
  /**
   * Register any application services.
   * @return void
   */
  public register() {
    this.app.singleton("Authenticator", Authenticator, "class");
    this.app.singleton("Mailer", Mailer, "class");
    this.app.singleton("UserService", UserService, "class");
    this.app.singleton("ClockInService", ClockInService, "class");
    this.app.singleton("PasswordResetService", PasswordResetService, "class");
    this.app.singleton("ClockOutService", ClockOutService, "class");
    this.app.singleton("ActivityService", ActivityService, "class");
  }

  /**
   * Bootstrap any application services.
   * @return void
   */
  public async boot() {
    //
  }
}

export default AppServiceProvicer;
