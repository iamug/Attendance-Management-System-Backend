class RegisterRequestDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(requestBody: object) {
    this.firstname = requestBody["firstname"];
    this.lastname = requestBody["lastname"];
    this.email = requestBody["email"];
    this.password = requestBody["password"];
  }
}

export default RegisterRequestDTO;
