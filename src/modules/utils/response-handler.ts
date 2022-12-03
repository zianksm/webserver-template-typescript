import { INTERNAL_SERVER_ERROR } from "./status-code";
import { Response } from "express";

export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export class ResponseHandler {
  private static makeResponse<T>(
    status: boolean = false,
    message: string,
    data: T
  ): ApiResponse<T> {
    return {
      status: status,
      message: message,
      data: data,
    };
  }

  public static Error<T extends Error>(
    res: Response,
    error: T,
    code: number = INTERNAL_SERVER_ERROR
  ) {
    return res.status(code).send(this.makeResponse(false, error.message, null));
  }

  public static Succes<T>(
    res: Response,
    code: number = 200,
    data: T = null,
    status: boolean = true,
    message: string = "success"
  ) {
    return res.status(code).send(this.makeResponse(status, message, data));
  }
}
