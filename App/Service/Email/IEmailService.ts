interface IEmailService {
    sendEmail(
      user_email: string,
    ): Promise<String>;
  }
  export default IEmailService;
  