import { Config } from "../config/server-config";
import { JwtHandler, jwtVerifyStatus } from "./jwt";
import axios from "axios";

export interface ServerUtils {
  fetch<T, U>(
    url: string,
    body: T,
    method: "get" | "post" | "put" | "delete"
  ): Promise<U>;
  createUuid(): string;
  isJWtVerified(token: string): jwtVerifyStatus;
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
}
