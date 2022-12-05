import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { Express } from "express-serve-static-core";
import morgan from "morgan";
import { Config } from "../../modules/config/server-config";
import { Utils, UtilsOptions } from "../../modules/utils/utils";

export interface IService {
  handle(req: Request, res: Response): void;
}

export interface Route {
  register(app: App): void;
}

export interface Server {
  start(): void;
  getAttributes(): AppAttributes;
}

export interface Module {
  init(): void;
}

export interface Manager<T> {
  notify(msg: T): void;
}

export const MAX_FILE_SIZE = 100 * 1024 * 1024;
export type AppAttributes = {
  config: Config;
  utils: Utils;
};
export class App implements Server {
  public readonly config: Config;
  public readonly utils: Utils;
  public readonly app: Express;
  private isInitialized: boolean = false;

  constructor() {
    const utilsOptions: UtilsOptions = {
      webhookInstance: true,
      mailQueue: true,
    };
    this.config = new Config();
    this.utils = new Utils(this.config, utilsOptions);
    this.app = express();
    this.build();
  }

  public getAttributes(): AppAttributes {
    return {
      config: this.config,
      utils: this.utils,
    };
  }

  public async start() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      // initialize modules and register routes
      this.listen();
    } else return;
  }

  private build() {
    const fileUploadOpt = {
      limits: { fileSize: MAX_FILE_SIZE },
      useTempFiles: true,
    };

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("combined"));
    this.app.use(express.static("public"));
    this.app.use(fileUpload(fileUploadOpt));
  }

  private listen() {
    const app = this.app.listen(this.config.port, "localhost", () => {
      console.log("server started");
    });
  }
}
