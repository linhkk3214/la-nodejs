import { BaseController } from '../base/base-controller';
import DanhSachTrungTuyen, { IDanhSachTrungTuyen } from '../models/danhsachtrungtuyen';

export class DanhSachTrungTuyenController extends BaseController {
    constructor() {
        super(DanhSachTrungTuyen);
    }

    override beforeSave(model: IDanhSachTrungTuyen): void {
        model.hoVaTen = `${model.ho} ${model.ten}`;
    }
}
