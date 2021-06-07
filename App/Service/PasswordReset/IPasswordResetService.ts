interface IPasswordResetService {
  createResetToken(
    user_email: string,
    hash: string,
    period: string
  ): Promise<Boolean>;
  getUserByEmail(email: string): Promise<object>;
  sendResetEmail(email: string): void;
  sendRegistrationEmail(payload: object): void;
}
export default IPasswordResetService;
