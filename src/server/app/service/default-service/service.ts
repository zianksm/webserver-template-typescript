import { AppAttributes, IService } from "../../app";
import { Service } from "../base-service";

export class DefaultService extends Service implements IService {
  constructor(attributes: AppAttributes) {
    super(attributes);
  }
  public async handle(req: Request, res: Response) {}
}
