import { BaseController } from '../base/base-controller';
import { EnumTrangThaiHS } from '../base/enums';
import DanhSachTrungTuyen, { IDanhSachTrungTuyen } from '../models/danhsachtrungtuyen';
import HoSoNguoiHoc from '../models/hosonguoihoc';
import DanhSachLopHanhChinh from '../models/danhsachlophanhchinh';
import DM_ChuongTrinhDaoTao from '../models/dm-chuongtrinhdaotao';
import DotNhapHoc from '../models/dotnhaphoc';

export class DanhSachTrungTuyenController extends BaseController {
    modelOld: IDanhSachTrungTuyen;
    constructor() {
        super(DanhSachTrungTuyen);
    }

    override beforeSave = async (model: IDanhSachTrungTuyen, isUpdate: boolean) => {
        model.hoVaTen = `${model.ho} ${model.ten}`;
        if (isUpdate) {
            this.modelOld = await DanhSachTrungTuyen.findOne({ _id: model._id });
        }
    }

    override async afterInsert(model: IDanhSachTrungTuyen, body: any): Promise<void> {
        if (model.trangThai == EnumTrangThaiHS.TT1) {
            await this.taoHoSoNguoiHoc(model);
        }
    }

    override async afterUpdate(model: IDanhSachTrungTuyen, body: any): Promise<void> {
        // Sau khi cập nhật thì nếu chuyển từ trạng thái chưa nộp đủ => nộp đủ thì tạo người học
        if (this.modelOld.trangThai == EnumTrangThaiHS.TT3
            || this.modelOld.trangThai == EnumTrangThaiHS.TT2
        ) {
            if (model.trangThai == EnumTrangThaiHS.TT1) {
                await this.taoHoSoNguoiHoc(model);
            }
        }
    }

    private async taoHoSoNguoiHoc(model: IDanhSachTrungTuyen) {
        // Kiểm tra đã tạo sinh viên với bản ghi trúng tuyển hay chưa
        const exist = await HoSoNguoiHoc.exists({ maSv: model.maSv });
        if (exist) return;

        const itemDotNhapHoc = await DotNhapHoc.findOne({ _id: model.idDotNhapHoc });

        // Lấy ra các chương trình đào tạo gắn với ngành trúng tuyển của sinh viên
        const lstCtdt = await DM_ChuongTrinhDaoTao.find({
            idNganh: model.idNganhTrungTuyen,
            idKhoaHoc: itemDotNhapHoc.idKhoaHoc
        });

        // Lấy ra 1 lớp hành chính bất kỳ thuộc [chương trình đào tạo của ngành trúng tuyển] của sinh viên 
        const itemLopHanhChinh = await DanhSachLopHanhChinh.findOne({
            idChuongTrinhDaoTao: {
                $in: lstCtdt.map(q => q._id)
            }
        });
        if (!itemLopHanhChinh) return;
        const itemNguoiHoc = new HoSoNguoiHoc({
            ...model,
            maSv: model.maSv,
            idLopHanhChinh: itemLopHanhChinh._id,
            idHe: itemLopHanhChinh.idHeDaoTao,
            idKhoa: itemLopHanhChinh.idKhoaVien,
            idKhoaHoc: itemLopHanhChinh.idKhoaHoc,
            idNganh: itemLopHanhChinh.idChuongTrinhDaoTao,
            idTrangThai: '6299939fe9efbdcb6417b423',
            ngaySinh: model.ngaySinh
        });

        await itemNguoiHoc.save();
    }
}
