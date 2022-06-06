import { BaseController } from '../base/base-controller';
import User, { IUser } from '../models/dm-cosodaotao';

export class DM_CoSoDaoTaoController extends BaseController {
    constructor() {
        super(User);
    }
    override beforeSave(model: IUser): void {
        // Chỗ này để can thiệp vào model của đối tượng trước khi save
        model.diaChi = 'Hà Nội';
    }

    override afterSave(model: IUser): void {
        console.log('Sau khi user đã lưu');
    }
}
