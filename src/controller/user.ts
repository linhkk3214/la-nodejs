import { BaseController } from '../base/base-controller';
import User, { IUser } from '../models/user';

export class UserController extends BaseController {
    constructor() {
        super(User);
    }

    override async beforeSave(model: IUser) {
        model.hoVaTen = `${model.ho} ${model.ten}`;
    }
}
