import { BaseController } from '../base/base-controller';
import DanhSachLopHanhChinh from '../models/danhsachlophanhchinh';

export class DanhSachLopHanhChinhController extends BaseController {
    constructor() {
        super(DanhSachLopHanhChinh);
    }
}
