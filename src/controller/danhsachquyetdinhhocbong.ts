import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhHocBong, { IDanhSachQuyetDinhHocBong } from '../models/danhsachquyetdinhhocbong';

export class DanhSachQuyetDinhHocBongController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhHocBong);
    }

}
