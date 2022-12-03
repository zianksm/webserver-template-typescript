import { Config } from "../config/server-config";
import { JwtHandler, jwtVerifyStatus } from "./jwt";
import axios, { AxiosResponse } from "axios";
import { Request } from "express";

export interface ServerUtils {
  fetch<T, U>(
    url: string,
    body: T,
    method: "get" | "post" | "put" | "delete"
  ): Promise<U>;
  createUuid(): string;
  verifyJwt(req: Request): jwtVerifyStatus;
}

export class Utils implements ServerUtils {
  private jwtHandler: JwtHandler;
  private config: Config;

  constructor(jwtHandler: JwtHandler, config: Config) {
    this.jwtHandler = jwtHandler;
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
}
