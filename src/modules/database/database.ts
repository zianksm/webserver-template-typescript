import dotenv from "dotenv";

type ConfigOption = {
  toNumber: boolean;
};
export class Config {
  private _nodeEnv: string;
  private _slackWebhookUrl: string;
  private _slackIconUrl: string;
  private _port: number;
  //   private _smtpHost: string;
  //   private _smptPort: number;
  //   private _smtpUser: string;
  //   private _smtpPassword: string;
  private _slackUsername: string;
  private _dbUrl: string;
  private _dbName: string;
  private _webUrl: string;
  //   private _baliolaCoreApiUrl: string;
  private _thisServerUrl: string;
  //   private _pinataApiKey: string;
  //   private _pinataSecretKey: string;
  private _jwtSecret: string;
  //   private _betamaxWsUrl: string;

  constructor() {
    this._nodeEnv = this.getEnv("NODE_ENV");
    this.loadEnv();
    this._slackWebhookUrl = this.getEnv("SLACK_WEBHOOK_URL");
    this._slackIconUrl = this.getEnv("SLACK_ICON_URL");
    this._port = this.getEnv("PORT", { toNumber: true });
    // this._smtpHost = this.getEnv("SMTP_HOST");
    // this._smptPort = this.getEnv("SMTP_PORT", { toNumber: true });
    // this._smtpUser = this.getEnv("SMTP_USER");
    // this._smtpPassword = this.getEnv("SMTP_PASS");
    this._slackUsername = this.getEnv("SLACK_USERNAME");
    this._dbUrl = this.getEnv("DB_URL");
    this._dbName = this.getEnv("DB_NAME");
    this._webUrl = this.getEnv("WEB_URL");
    // this._baliolaCoreApiUrl = this.getEnv("BALIOLA_URL");
    this._thisServerUrl = this.getEnv("SERVER_URL");
    // this._pinataApiKey = this.getEnv("PINATA_API_KEY");
    // this._pinataSecretKey = this.getEnv("PINATA_SECRET_KEY");
    this._jwtSecret = this.getEnv("JWT_SECRET");
    // this._betamaxWsUrl = this.getEnv("BETAMAX_WEBSOCKET_URL");
  }

  private loadEnv() {
    switch (this._nodeEnv) {
      case "production":
        dotenv.config({ path: "./src/modules/config/.env.production" });
        break;
      case "local":
        dotenv.config({ path: "./src/modules/config/.env.local" });
        break;
      case "staging":
        dotenv.config({ path: "./src/modules/config/.env.staging" });
        break;
      default:
        dotenv.config({ path: "./src/modules/config/.env.local" });
        break;
    }
  }

  private getEnv(name: string): string;
  private getEnv(name: string, option?: ConfigOption): number;

  private getEnv(name: string, option?: ConfigOption): string | number {
    const env = process.env[name];
    this.eval(env, name);

    if (option?.toNumber) return parseInt(env);
    else return env;
  }

  private eval(val: any, ident: string) {
    if (val === undefined) throw new Error(`missing creds : ${ident}`);
    else return;
  }

  //   public get betamaxWsUrl(): string {
  //     return this._betamaxWsUrl;
  //   }

  public get jwtSecret(): string {
    return this._jwtSecret;
  }

  //   public get pinataApiKey(): string {
  //     return this._pinataApiKey;
  //   }

  //   public get pinataSecretKey(): string {
  //     return this._pinataSecretKey;
  //   }

  public get nodeEnv(): string {
    return this._nodeEnv;
  }

  public get slackWebhookUrl(): string {
    return this._slackWebhookUrl;
  }

  public get slackIconUrl(): string {
    return this._slackIconUrl;
  }

  public get port(): number {
    return this._port;
  }

  //   public get smtpHost(): string {
  //     return this._smtpHost;
  //   }

  //   public get smptPort(): number {
  //     return this._smptPort;
  //   }

  //   public get smtpUser(): string {
  //     return this._smtpUser;
  //   }

  //   public get smtpPassword(): string {
  //     return this._smtpPassword;
  //   }

  public get slackUsername(): string {
    return this._slackUsername;
  }

  public get dbUrl(): string {
    return this._dbUrl;
  }

  public get dbName(): string {
    return this._dbName;
  }

  public get webUrl(): string {
    return this._webUrl;
  }

  //   public get baliolaCoreApiUrl(): string {
  //     return this._baliolaCoreApiUrl;
  //   }

  public get thisServerUrl(): string {
    return this._thisServerUrl;
  }
}
