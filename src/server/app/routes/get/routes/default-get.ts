import { App } from "../../../app";

export class GlobalRoute {
  private instance: App;
  constructor(instance: App) {
    this.instance = instance;
  }
  public register() {
    this.instance.app.get("/", async (req, res) => {
      res.send();
    });
  }
}
