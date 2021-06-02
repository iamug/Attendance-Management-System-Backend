import ClockInRepository from "App/Repository/ClockInRepository";
import ClockOutRepository from "App/Repository/ClockOutRepository";
import IActivityService from "./IActivityService";

class ActivityService implements IActivityService {
  async getUserActivities(id: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let clockIn = await new ClockInRepository().findBy("user", id);
        let clockOut = await new ClockOutRepository().findBy("user", id);
        // let datab = [...Object.values(clockIn), ...Object.values(clockOut)];
        // console.log("data");
        // let result = datab.reduce(function (r, a) {
        //   r[new Date(a.createdAt).toDateString()] =
        //     r[new Date(a.createdAt).toDateString()] || [];
        //   r[new Date(a.createdAt).toDateString()].push(a);
        //   return r;
        // }, Object.create(null));
        // console.log(result);
        resolve({
          status: true,
          data: [...Object.values(clockIn), ...Object.values(clockOut)],
        });
        resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
}

export default ActivityService;
