import ClockOutRepository from "App/Repository/ClockOutRepository";
import IClockOutService from "./IClockOutService";
import LOG from "Elucidate/Log";
import IUserService from "../User/IUserService";
import ClockInRepository from "App/Repository/ClockInRepository";
class ClockOutService implements IClockOutService {
  protected userService: IUserService;
  constructor(UserService: IUserService) {
    this.userService = UserService;
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
        let checkClockIn = await this.checkClockIn(emailCheck["data"]);
        if (!checkClockIn) reject("You have not clocked in for today");
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
  async checkClockIn(user: string): Promise<Boolean> {
    const startDate = new Date(new Date().setHours(0, 0, 0, 0));
    const endDate = new Date();
    const query = { user, createdAt: { $gte: startDate, $lt: endDate } };
    let clockInData;
    try {
      clockInData = await new ClockInRepository().findOne(query);
    } catch (error) {
      return false;
    }
    if (clockInData[0]) return true;
    return false;
  }
}

export default ClockOutService;
