import { Type } from "typescript";
import { Config } from "../../modules/config/server-config";
import { Utils } from "../../modules/utils/utils";

export interface Service {
  handle(req: Request, res: Response): void;
}

export interface Route {
  register(app: App): void;
}

export interface Server {
  start(): void;
}

export interface Module {
  init(): void;
}

export interface Manager<T> {
  notify(msg: T): void;
}

export class App implements Server {
  public readonly config: Config;
  public readonly utils: Utils;

  constructor() {
    this.config = new Config();
    this.utils = new Utils(this.config);
  }

  start() {}
}
