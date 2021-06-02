import UserRepository from "App/Repository/UserRepository";
import { resolve4 } from "dns";
import IUserService from "./IUserService";

class UserService implements IUserService {
  async getUserNameByEmail(email: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await new UserRepository().findOne({ email });
        if (user[0]) {
          let res = {
            id: user[0]["_id"],
            fullname: user[0]["firstname"] + " " + user[0]["lastname"],
          };
          resolve({ status: true, data: res });
        }
        resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
  async getUserNameById(id: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await new UserRepository().findOne({ _id: id });
        if (user[0]) {
          let res = {
            id: user[0]["_id"],
            fullname: user[0]["firstname"] + " " + user[0]["lastname"],
          };
          resolve({ status: true, data: res });
        }
        resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
  async getUserByEmail(email: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await new UserRepository().findOne({ email });
        if (user[0]) resolve({ status: true, data: user[0] });
        resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
  async getUserById(id: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await new UserRepository().findOne({ _id: id });
        if (user[0]) resolve({ status: true, data: user[0] });
        resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
  async getUserIdByEmail(email: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await new UserRepository().findOne({ email });
        if (user[0]) resolve({ status: true, data: user[0]["_id"] });
        resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
  async updateUserByEmail(email: string, password: string): Promise<object> {
    return await new Promise(async (resolve, reject) => {
      try {
        let user = await new UserRepository().updateOneWhere(
          { email },
          { password }
        );
        if (user[0]) resolve({ status: true, data: user[0] });
        resolve({ status: false, data: "User does not exist" });
      } catch (error) {
        reject({ status: false, data: error });
      }
    });
  }
}

export default UserService;
