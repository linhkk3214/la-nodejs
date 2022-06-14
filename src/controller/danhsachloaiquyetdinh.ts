import { BaseController } from '../base/base-controller';
import DanhSachLoaiQuyetDinh, { IDanhSachLoaiQuyetDinh } from '../models/danhsachloaiquyetdinh';

export class DanhSachLoaiQuyetDinhController extends BaseController {
    constructor() {
        super(DanhSachLoaiQuyetDinh);
    }

}
