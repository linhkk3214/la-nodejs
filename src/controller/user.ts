import { BaseController } from '../base/base-controller';
import User from '../models/user';

export class UserController extends BaseController {
    constructor() {
        super(User);
    }
}
