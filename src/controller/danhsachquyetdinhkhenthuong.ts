import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhKhenThuong, { IDanhSachQuyetDinhKhenThuong } from '../models/danhsachquyetdinhkhenthuong';

export class DanhSachQuyetDinhKhenThuongController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhKhenThuong);
    }

}
