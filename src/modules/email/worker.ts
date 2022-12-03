import { Config } from "../config/server-config";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";

export interface MailWorker {
  send(email: string, subject: string, html: string): any;
}

export class Mail implements MailWorker {
  private config: Config;
  private worker: nodemailer.Transporter<SentMessageInfo>;

  constructor(config: Config) {
    this.config = config;
    this.worker = this.buildTransport();
  }

  public async send(email: string, subject: string, html: string) {
    const mail: MailOptions = {
      from: this.config.serverEmail,
      sender: this.config.serverEmail,
      to: email,
      subject,
      html,
    };

    const response = await this.worker.sendMail(mail);

    return response;
  }

  private buildTransport() {
    return nodemailer.createTransport({
      host: this.config.smtpHost,
      port: this.config.smptPort,
      auth: {
        user: this.config.smtpUser,
        pass: this.config.smtpPassword,
      },
    });
  }
}
