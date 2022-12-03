import { Config } from "../config/server-config";
import { JwtHandler, jwtVerifyStatus } from "./jwt";
import axios from "axios";
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

  public async fetch<T, U>(
    url: string,
    body: T,
    method: "get" | "post" | "put" | "delete"
  ): Promise<U> {
    const response = await axios[method](url, body);
    const responseData: U = response.data;

    return responseData;
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
