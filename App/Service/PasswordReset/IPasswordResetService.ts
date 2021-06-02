interface IPasswordResetService {
  createResetToken(
    user_email: string,
    hash: string,
    period: string
  ): Promise<Boolean>;
  getUserByEmail(email: string): Promise<object>;
}
export default IPasswordResetService;
