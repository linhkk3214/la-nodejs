import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhChuyenNganh, { IDanhSachQuyetDinhChuyenNganh } from '../models/danhsachquyetdinhchuyennganh';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';

export class DanhSachQuyetDinhChuyenNganhController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhChuyenNganh);
    }

    override async afterInsert(model: IDanhSachQuyetDinhChuyenNganh) {
        // Sau khi lưu quyết định thì chuyển ngành cho người học
        // Chỉ làm với hàm afterInsert, k làm vs hàm afterUpdate vì nó k đúng 
        await HoSoNguoiHoc.updateMany({ _id: { $in: model.lstIdNguoiHoc } }, {
            $set: {
                idNganh: model.idNganhChuyen,
                idLopHanhChinh: model.idLopChuyen
            }
        });
    }
}
