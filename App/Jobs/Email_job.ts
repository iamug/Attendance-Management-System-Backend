"use strict";
import ShouldQueue from "expresswebcorets/lib/Queue/shoudQueue";
import Mailer from '../Mailer'

class EmailJob extends ShouldQueue {
  constructor() {
    super();
    this.signature = "Email_job";
    this.queueSignature(this.signature);
  }
  /**
   * Execute the job.
   * @return void
   */
  handle(data: { body: string; client_name: string; sender_name: string; to: string; token: string; template: string; from: string; subject: string; }) {
    new Mailer().sendMailTransport(data);
  }
}

export default EmailJob;
