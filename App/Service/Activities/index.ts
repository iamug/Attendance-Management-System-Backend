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

  private formatData(data1: object | object[], data2: object | object[]) {
    // cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }],

    // let result = newData.reduce(function (r, a) {
    //     r[ new Date(a.createdAt).toDateString()] = r[ new Date(a.createdAt).toDateString()]  || [];
    //     r[a.createdAt].push(a);
    //     return r;
    // }, Object.create(null));

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
