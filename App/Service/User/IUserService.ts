interface IUserService {
  getUserIdByEmail(email: string): Promise<object>;
  updateUserByEmail(email: string, password: string): Promise<object>;
}

export default IUserService;
