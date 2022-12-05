import { CREATED } from "../../../../../modules/utils/status-code";
import { App } from "../../../app";

export class GlobalRoute {
  private instance: App;
  constructor(instance: App) {
    this.instance = instance;
  }
  public register() {
    this.instance.app.get("/default/put", async (req, res) => {
      res.send().status(CREATED);
    });
  }
}
