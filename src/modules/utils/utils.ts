import { Config } from "../config/server-config";
import { Jwt, JwtHandler, jwtVerifyStatus } from "./jwt";
import axios, { AxiosResponse } from "axios";
import { Request } from "express";
import { SlackWebhook, webhookError } from "../webhook/slack";
import { MailManager, mailRequest } from "../email/manager";

export interface ServerUtils {
  fetch<T, U>(
    url: string,
    body: T,
    method: "get" | "post" | "put" | "delete"
  ): Promise<U>;
  createUuid(): string;
  verifyJwt(req: Request): jwtVerifyStatus;
  notifyError<T extends Error>(process: string, error: T): void;
  notifyEmail<T extends mailRequest>(msg: T): void;
}

export type UtilsOptions = {
  /**
   * will create a new slack webhook queue instance if set to `true`
   * */
  webhookInstance?: boolean;

  /**
   * will create a new mail queue instance if set to `true`
   */
  mailQueue?: boolean;
};

export class Utils implements ServerUtils {
  private jwtHandler: JwtHandler;
  private config: Config;
  private slackQueue: SlackWebhook;
  private mailQueue: MailManager;

  constructor(config: Config, options?: UtilsOptions) {
    if (options?.webhookInstance === true)
      this.slackQueue = new SlackWebhook(config);
    if (options?.mailQueue === true)
      this.mailQueue = new MailManager(this, this.config);

    this.jwtHandler = new Jwt(config);
    this.config = config;
  }

  public async fetch<T, U>(
    url: string,
    body: T,
    method: "get" | "post" | "put" | "delete"
  ): Promise<U> {
    const response: AxiosResponse<U> = await axios[method](url, body);
    return response.data;
  }

  public createUuid(): string {
    return crypto.randomUUID();
  }

  private getJwt(req: Request): string {
    const header = req.header("Authorization");

    const jwt = header.split("Bearer ").pop();

    return jwt.trim();
  }

  public verifyJwt(req: Request): jwtVerifyStatus {
    const jwt = this.getJwt(req);
    const verifyResponse = this.jwtHandler.verify(jwt);

    return verifyResponse;
  }

  public notifyError<T extends Error>(process: string, error: T): void {
    if (this.slackQueue !== undefined && this.slackQueue !== null) {
      const _error: webhookError = {
        processError: process,
        message: error.message,
        stackTrace: error.stack,
      };
      this.slackQueue.notify(_error);
    } else {
      throw new Error(
        "cannot notify error as this utility class instance does not have slack webhoook instantiated."
      );
    }
  }

  public notifyEmail<T extends mailRequest>(msg: T): void {
    if (this.mailQueue !== undefined && this.mailQueue !== null) {
      this.mailQueue.notify(msg);
    } else {
      throw new Error(
        "cannot notify mail as this utility class instance does not have slack webhoook instantiated."
      );
    }
  }
}
