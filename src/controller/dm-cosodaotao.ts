import { BaseController } from '../base/base-controller';
import User, { IUser } from '../models/dm-cosodaotao';

export class DM_CoSoDaoTaoController extends BaseController {
    constructor() {
        super(User);
    }
    override beforeSave(model: IUser): void {
        model.diaChi = 'Hà Nội';
    }
}
