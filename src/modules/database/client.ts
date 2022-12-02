import mongoose from "mongoose";

export abstract class Client {
  protected client: mongoose.Connection;
  //   protected User: mongoose.Model<IUser, {}, {}, {}, any>;

  protected init(client: mongoose.Connection /** userSchema: any */) {
    this.client = client;
    // this.User = this.client.model<IUser>("user", userSchema);
  }

  //   protected getUserModel() {
  //     return this.User;
  //   }

  protected checkClient() {
    if (this.client === undefined)
      throw new Error("no mongodb client is present!");
  }
}
