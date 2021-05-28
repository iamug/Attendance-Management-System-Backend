import nodemailer = require("nodemailer");
import env from "Elucidate/ENV";
import ejs =  require("ejs");
import IMailer from './IMailer';

class Mailer implements IMailer{
  sendMailTransport(payload: { body: string; client_name: string; sender_name: string; to: string; token: string; template: string; from: string; subject: string; }): void {
    let path = this.templateToUse(payload.template);
    ejs.renderFile(
      __dirname + `/Templates/${path}.ejs`,
      {
        body: payload.body,
        client_name: payload.client_name,
        sender_name: payload.sender_name,
        to: payload.to,
        token: payload.token,
      },
      (err: any, data) => {
        if (err) {
            console.log(err);
          throw new Error(err);
        } else {
          let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "bc6d83c08aa1ea",
                pass: "2ec65d4a2f784f"
            },
          });
          let mailOptions = this.mailOptions(payload, data);
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log("message sent " + info);
            }
          });
        }
      }
    );
  }

  private mailOptions(payload: { to?: string; from: string; subject: string; }, data: string): object {
    return {
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        html: data,
      };
  }

  private templateToUse(template = "mail") {
    return template;
  }
}

export default Mailer;
