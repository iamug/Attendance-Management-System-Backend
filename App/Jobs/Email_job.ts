"use strict";
import ShouldQueue from "expresswebcorets/lib/Queue/shoudQueue";
import Mailer from "../Mailer";
import IEmail_job from "./IEmail_job";

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
  handle(data: IEmail_job) {
    new Mailer().sendMailTransport(data);
  }
}

export default EmailJob;
