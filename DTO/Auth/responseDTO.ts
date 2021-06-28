type Response = {
  auth: boolean;
  token: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
  };
};

class ResponseDTO {
  auth: boolean;
  token: string;
  user: { firstname: string; lastname: string; email: string; avatar: string };

  constructor(responseData: Response) {
    this.auth = responseData.auth;
    this.token = responseData.token;
    this.user = {
      firstname: responseData.user.firstname,
      lastname: responseData.user.lastname,
      email: responseData.user.email,
      avatar: responseData.user.avatar || "",
    };
  }
}
export default ResponseDTO;
