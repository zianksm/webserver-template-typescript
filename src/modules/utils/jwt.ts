import jwt from "jsonwebtoken";
import { Config } from "../config/server-config";

// TODO : discuss jwt payload
export type jwtPayload = {};
export type jwtVerifyStatus = {
  status: boolean;
  message?: string;
};

export interface JwtHandler {
  create(payload: jwtPayload): string;
  getExpiry(): string;
  decode(token: string): jwtPayload;
  verify(token: string): jwtVerifyStatus;
}

export class Jwt implements JwtHandler {
  private config: Config;
  private secret: string;

  constructor(config: Config) {
    this.config = config;
    this.secret = config.jwtSecret;
  }

  public create(payload: jwtPayload): string {
    return jwt.sign(payload, this.secret);
  }

  public getExpiry(): string {}

  public decode(token: string): jwtPayload {}

  public verify(token: string): jwtVerifyStatus {}
}
