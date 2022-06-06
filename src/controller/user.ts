import { BaseController } from '../base/base-controller';
import User, { IUser } from '../models/user';

export class UserController extends BaseController {
    constructor() {
        super(User);
    }

    override beforeSave(model: IUser): void {
        model.hoVaTen = `${model.ho} ${model.ten}`;
    }
}
