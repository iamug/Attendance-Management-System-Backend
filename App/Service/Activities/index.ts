import ClockInRepository from "App/Repository/ClockInRepository";
import ClockOutRepository from "App/Repository/ClockOutRepository";
import IActivityService from "./IActivityService";

class ActivityService implements IActivityService {
  async getUserActivities(id: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let clockInActivities = await new ClockInRepository().findBy(
          "user",
          id
        );
        let clockOutActivities = await new ClockOutRepository().findBy(
          "user",
          id
        );
        resolve({
          status: true,
          data: this.formatData(clockInActivities, clockOutActivities),
        });
        resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }

  private formatData(data1: object | object[], data2: object | object[]) {
    let returnData = [];
    for (let i in data1) {
      returnData.push(data1[i]);
    }

    for (let i in data2) {
      returnData.push(data2[i]);
    }
    return returnData;
  }
}

export default ActivityService;
