export interface IMailer {
  sendMailTransport(payload: {body: string;
    client_name: string;
    sender_name: string;
    to: string;
    token?: string;
    template: string;
    from: string,
    subject: string}): void;
}

export default IMailer;
