import { BaseController } from '../base/base-controller';
import DanhSachLoaiKhenThuong, { IDanhSachLoaiKhenThuong } from '../models/danhsachloaikhenthuong';

export class DanhSachLoaiKhenThuongController extends BaseController {
    constructor() {
        super(DanhSachLoaiKhenThuong);
    }

}
