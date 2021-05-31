import ClockInRepository from "App/Repository/ClockInRepository";
import IClockInService from "./IClockInService";
import LOG from "Elucidate/Log";
import IUserService from "../User/IUserService";
class ClockInService implements IClockInService {
  protected userService: IUserService;
  constructor(UserService: IUserService) {
    this.userService = UserService;
  }

  homePageClockin = async (
    email: string,
    location: { long: string; lat: string }
  ): Promise<string> => {
    return await new Promise(async (resolve, reject) => {
      try {
        let emailCheck = await this.userService.getUserIdByEmail(email);
        if (!emailCheck["status"]) reject("User not found");
        let saveLocation = await this.getLocation(emailCheck["data"], location);
        if (!saveLocation)
          reject(
            "Oops. Something went wrong. Our engineers are working on it."
          );
        resolve("You've successfully clocked in.");
      } catch (error) {
        LOG.error("Service/Clockin", "User email not found", error);
      }
    });
  };
  async getLocation(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<boolean> {
    return await new Promise(async (resolve, reject) => {
      return await new ClockInRepository()
        .create({ user: user_id, location })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          LOG.error("Service/ClockIn", "error while saving location", err);
          reject(false);
        });
    });
  }
}

export default ClockInService;
