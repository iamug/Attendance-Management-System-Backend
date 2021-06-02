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
  ): Promise<string> => {
    return await new Promise(async (resolve, reject) => {
      try {
        let emailCheck = await this.userService.getUserByEmail(email);
        if (!emailCheck["status"]) return reject("User not found");
        let id = emailCheck["data"]["id"];
        let name = emailCheck["data"]["fullname"];
        let checkClockIn = await this.clockInService.checkClockIn(id);
        if (!checkClockIn)
          return reject(`Hi ${name}, You have not clocked in for today.`);
        let checkClockOut = await this.checkClockOut(id);
        if (checkClockOut)
          return reject(`Hi ${name}, You have already clocked out for today.`);
        let saveLocation = await this.dashboardClockOut(id, location);
        if (!saveLocation)
          return reject(
            `Hi ${name}, Something went wrong. Our engineers are working on it.`
          );
        resolve(`Hi ${name}, You've successfully clocked out for today.`);
      } catch (error) {
        LOG.error("Service/ClockOut", "User email not found", error);
      }
    });
  };
  async dashboardClockOut(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<string> {
    return await new Promise(async (resolve, reject) => {
      let userCheck = await this.userService.getUserNameById(user_id);
      if (!userCheck["status"]) return reject("User not found");
      let name = userCheck["data"]["fullname"];
      if (!(await this.clockInService.checkClockIn(user_id)))
        return reject(`Hi ${name}, You have not clocked in for today.`);
      if (await this.checkClockOut(user_id))
        return reject(`Hi ${name}, You have already clocked out for today.`);
      return await new ClockOutRepository()
        .create({ user: user_id, location })
        .then(() => {
          resolve(`Hi ${name}, You've successfully clocked out for today.`);
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
