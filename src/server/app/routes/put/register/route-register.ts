import { App } from "../../../app";
import { GlobalRoute } from "../../put/routes/default-put";

export class Put {
  public static register(app: App) {
    const globalRoute = new GlobalRoute(app).register();

    return;
  }
}
