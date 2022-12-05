import { App } from "../../../app";
import { GlobalRoute } from "../../post/routes/default-post";

export class Get {
  public static register(app: App) {
    const globalRoute = new GlobalRoute(app).register();

    return;
  }
}
