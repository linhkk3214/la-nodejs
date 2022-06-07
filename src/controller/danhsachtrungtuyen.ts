import { BaseController } from '../base/base-controller';
import DanhSachTrungTuyen from '../models/danhsachtrungtuyen';

export class DanhSachTrungTuyenController extends BaseController {
    constructor() {
        super(DanhSachTrungTuyen);
    }
}
