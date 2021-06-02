interface IUserService {
  getUserIdByEmail(email: string): Promise<object>;
  getUserNameByEmail(email: string): Promise<object>;
  getUserNameById(id: string): Promise<object>;
  getUserByEmail(email: string): Promise<object>;
  getUserById(id: string): Promise<object>;
  updateUserByEmail(email: string, password: string): Promise<object>;
}

export default IUserService;
