import ClockOutRepository from "App/Repository/ClockOutRepository";
import IClockOutService from "./IClockOutService";
import LOG from "Elucidate/Log";
import IUserService from "../User/IUserService";
import IClockInService from "../ClockIn/IClockInService";
class ClockOutService implements IClockOutService {
  protected userService: IUserService;
  protected clockInService: IClockInService;
  constructor(UserService: IUserService, ClockInService: IClockInService) {
    this.userService = UserService;
    this.clockInService = ClockInService;
  }

  homePageClockOut = async (
    email: string,
    location: { long: string; lat: string }
  ): Promise<String> => {
    return await new Promise(async (resolve, reject) => {
      try {
        let emailCheck = await this.userService.getUserIdByEmail(email);
        if (!emailCheck["status"]) {
          reject("User not found");
          return;
        }
        let checkClockIn = await this.clockInService.checkClockIn(
          emailCheck["data"]
        );
        if (!checkClockIn) reject("You have not clocked in for today");
        let checkClockOut = await this.checkClockOut(emailCheck["data"]);
        if (!checkClockOut) reject("You have already clocked out for today");
        let saveLocation = await this.dashboardClockOut(
          emailCheck["data"],
          location
        );
        if (!saveLocation)
          reject(
            "Oops. Something went wrong. Our engineers are working on it."
          );
        resolve("You've successfully clocked out.");
      } catch (error) {
        LOG.error("Service/ClockOut", "User email not found", error);
      }
    });
  };
  async dashboardClockOut(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<Boolean> {
    return await new Promise(async (resolve, reject) => {
      if (!(await this.clockInService.checkClockIn(user_id)))
        reject("You have not clocked in for today");
      if (!(await this.checkClockOut(user_id)))
        reject("You have already clocked out for today");
      return await new ClockOutRepository()
        .create({ user: user_id, location })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          LOG.error("Service/ClockOut", "error while saving location", err);
          reject(false);
        });
    });
  }
  async checkClockOut(user: string): Promise<Boolean> {
    const startDate = new Date(new Date().setHours(0, 0, 0, 0));
    const endDate = new Date();
    const query = { user, createdAt: { $gte: startDate, $lt: endDate } };
    let clockOutData;
    try {
      clockOutData = await new ClockOutRepository().findOne(query);
    } catch (error) {
      return false;
    }
    if (clockOutData[0]) return true;
    return false;
  }
}

export default ClockOutService;
