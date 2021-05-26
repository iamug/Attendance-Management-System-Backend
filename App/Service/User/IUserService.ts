interface IUserService {
  getUserIdByEmail(email: string): Promise<object>;
}

export default IUserService;
