import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhHocTap, { IDanhSachQuyetDinhHocTap } from '../models/danhsachquyetdinhhoctap';
import DanhSachLoaiQuyetDinh from '../models/danhsachloaiquyetdinh';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';


export class DanhSachQuyetDinhHocTapController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhHocTap);
    }

    override async afterInsert(model: IDanhSachQuyetDinhHocTap) {
        const itemLoaiQuyetDinh = await DanhSachLoaiQuyetDinh.findOne({ _id: model.idLoaiQuyetDinh });
        await HoSoNguoiHoc.updateMany({ _id: { $in: model.lstIdNguoiHoc } }, {
            $set: {
                idTrangThai: itemLoaiQuyetDinh.trangThaiNganh1
            }
        });
    }
}
//hì được ạ nhưng để em xem chỗ kia anh code