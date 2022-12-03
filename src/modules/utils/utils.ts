import { Config } from "../config/server-config";
import { JwtHandler, jwtVerifyStatus } from "./jwt";

export interface ServerUtils {
  fetch<T, U>(
    url: string,
    body: T,
    method: "get" | "post" | "put" | "delete"
  ): U;
  isJWtVerified(token: string): jwtVerifyStatus;
}

export class Utils {
  private jwtHandler: JwtHandler;
  private config: Config;
}
