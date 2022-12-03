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

export class Jwt {}
