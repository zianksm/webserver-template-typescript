import { Manager } from "../../server/app/app";
import { Config } from "../config/server-config";
import { Utils } from "../utils/utils";
import { Mail } from "./worker";
import Queue from "bull";

export type mailRequest = {
  email: string;
  subject: string;
  html: string;
};

export class MailManager implements Manager<mailRequest> {
  private mailWorker: Mail;
  private utils: Utils;
  private config: Config;
  private queue: Queue.Queue<mailRequest>;
  private readonly processName = "SEND EMAIL";

  constructor(utils: Utils, config: Config) {
    this.config = config;
    this.utils = utils;
    this.queue = new Queue("email-queue");
    this.mailWorker = new Mail(this.config);
    this.processQueue();
  }

  public notify(msg: mailRequest): void {}
  private processQueue() {
    this.queue.process(async (job) => {
      try {
        const { email, subject, html } = job.data;
        console.log("sending email to " + email);

        const action = await this.mailWorker.send(email, subject, html);

        console.log(action);

        console.log(`Email sent succesfully to ${email}`);

        return Promise.resolve();
      } catch (error) {
        this.utils.notifyError(this.processName, error);
        return Promise.reject(error.message);
      }
    });
  }
}
