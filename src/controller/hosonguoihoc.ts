import { BaseController } from '../base/base-controller';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';

export class HoSoNguoiHocController extends BaseController {
    constructor() {
        super(HoSoNguoiHoc);
    }
    override async beforeSave(model: IHoSoNguoiHoc) {
        model.hoVaTen = `${model.Ho} ${model.Ten}`;
    }
}
