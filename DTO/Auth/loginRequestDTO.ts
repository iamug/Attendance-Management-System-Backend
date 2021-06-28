class LoginRequestDTO {
  email: string;
  password: string;

  constructor(requestBody: object) {
    this.email = requestBody["email"];
    this.password = requestBody["password"];
  }
}

export default LoginRequestDTO;
