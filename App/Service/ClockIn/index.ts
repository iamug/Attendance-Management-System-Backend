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
        let userCheck = await this.userService.getUserNameByEmail(email);
        if (!userCheck["status"]) return reject("User not found");
        let id = userCheck["data"]["id"];
        let name = userCheck["data"]["fullname"];
        if (await this.checkClockIn(id))
          return reject(`Hi ${name}, You have already clocked in for today`);
        let saveLocation = await this.getLocation(id, location);
        if (!saveLocation)
          return reject(
            `Hi ${name}, Something went wrong. Our engineers are working on it.`
          );
        return resolve(`Hi ${name}, You've successfully clocked in for today.`);
      } catch (error) {
        LOG.error("Service/Clockin", "User email not found", error);
      }
    });
  };
  async getLocation(
    user_id: string,
    location: { long: string; lat: string }
  ): Promise<string> {
    return await new Promise(async (resolve, reject) => {
      let userCheck = await this.userService.getUserNameById(user_id);
      if (!userCheck["status"]) return reject("User not found");
      let name = userCheck["data"]["fullname"];
      if (await this.checkClockIn(user_id))
        return reject(`Hi ${name}, You have already clocked in for today`);
      return await new ClockInRepository()
        .create({ user: user_id, location })
        .then(() => {
          return resolve(
            `Hi ${name}, You've successfully clocked in for today.`
          );
        })
        .catch((err) => {
          LOG.error("Service/ClockIn", "error while saving location", err);
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

export default ClockInService;
