import { BaseController } from '../base/base-controller';
import HoSoNguoiHoc from '../models/hosonguoihoc';

export class HoSoNguoiHocController extends BaseController {
    constructor() {
        super(HoSoNguoiHoc);
    }
}
