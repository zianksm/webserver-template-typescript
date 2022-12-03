import { Config } from "../config/server-config";
import { Jwt, JwtHandler, jwtVerifyStatus } from "./jwt";
import axios, { AxiosResponse } from "axios";
import { Request } from "express";
import { SlackWebhook, webhookError } from "../webhook/slack";

export interface ServerUtils {
  fetch<T, U>(
    url: string,
    body: T,
    method: "get" | "post" | "put" | "delete"
  ): Promise<U>;
  createUuid(): string;
  verifyJwt(req: Request): jwtVerifyStatus;
  notifyError<T extends Error>(process: string, error: T): void;
}

export type UtilsOptions = {
  /**
   * will create a new slack webhook queue instance if set to `true`
   * */
  webhookInstance?: boolean;
};

export class Utils implements ServerUtils {
  private jwtHandler: JwtHandler;
  private config: Config;
  private slackQueue: SlackWebhook;

  constructor(config: Config, options?: UtilsOptions) {
    if (options?.webhookInstance === true)
      this.slackQueue = new SlackWebhook(config);

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
}
