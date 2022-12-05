import { App, AppAttributes } from "../app";

export abstract class Service {
  protected attributes: AppAttributes;

  constructor(attributes: AppAttributes) {
    this.attributes = attributes;
  }
}
