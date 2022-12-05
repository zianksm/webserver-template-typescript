import { App } from "../../../app";
import { GlobalRoute } from "../routes/default-get";

export class Get {
  public static register(app: App) {
    const globalRoute = new GlobalRoute(app).register();

    return;
  }
}
