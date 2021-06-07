import ClockInRepository from "App/Repository/ClockInRepository";
import ClockOutRepository from "App/Repository/ClockOutRepository";
import IActivityService from "./IActivityService";

class ActivityService implements IActivityService {
  async filterUserActivites(
    id: string,
    start: Date,
    end: Date
  ): Promise<object> {
    const startDate = new Date(new Date(start).setHours(0, 0, 0, 0));
    const endDate = new Date(new Date(end).setHours(23, 59, 59, 0));
    const query = { user: id, createdAt: { $gte: startDate, $lt: endDate } };
    return await new Promise(async (resolve, reject) => {
      try {
        let clockIn = await new ClockInRepository().getAllWhere(query);
        let clockOut = await new ClockOutRepository().getAllWhere(query);
        resolve({
          status: true,
          data: [...Object.values(clockIn), ...Object.values(clockOut)],
        });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
  async getUserActivities(id: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let clockIn = await new ClockInRepository().findBy("user", id);
        let clockOut = await new ClockOutRepository().findBy("user", id);
        resolve({
          status: true,
          data: [...Object.values(clockIn), ...Object.values(clockOut)],
        });
        // resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
}

export default ActivityService;
