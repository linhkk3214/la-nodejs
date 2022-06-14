import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhHocTap, { IDanhSachQuyetDinhHocTap } from '../models/danhsachquyetdinhhoctap';
import DanhSachLoaiQuyetDinh from '../models/danhsachloaiquyetdinh';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';


export class DanhSachQuyetDinhHocTapController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhHocTap);
    }
    override async afterInsert(model: IDanhSachQuyetDinhHocTap) {
        await DanhSachLoaiQuyetDinh.findOne({ _id: { $in: model.idLoaiQuyetDinh } }, {


        })
        await HoSoNguoiHoc.updateOne({ _id: { $in: model.lstIdNguoiHoc } }, {
            $set: {
                idTrangThai: 
            }
        });
    }
}
