"use strict";
import FormRequest from "Elucidate/Validator/FormRequest";

class HomePageClockin {
  /**
   * Handle the request validation.
   * @param {*} data | e.g request body
   */
  async validate<T>(data: T) {
    return await FormRequest.make(data, {
      location: {
        long: "required|numeric",
        lat: "required|numeric",
      },
      email: "required|email",
    });
  }
}

export default new HomePageClockin();
