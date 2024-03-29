import { BaseController } from '../base/base-controller';
import { EnumTrangThaiHS } from '../base/enums';
import DanhSachTrungTuyen from '../models/danhsachtrungtuyen';
import { IDanhSachTrungTuyen } from '../models/danhsachtrungtuyen';
import HoSoNguoiHoc from '../models/hosonguoihoc';
import DanhSachLopHanhChinh from '../models/danhsachlophanhchinh';
import DM_ChuongTrinhDaoTao from '../models/dm-chuongtrinhdaotao';
import { DefaultIdTrangThaiNguoiHoc } from '../base/const';
import { BaoCaoNhapHoc } from '../models/baocao';
import { Response } from 'express';

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
    };

    override async afterInsert(model: IDanhSachTrungTuyen, body: any): Promise<void> {
        if (model.trangThai == EnumTrangThaiHS.NOP_DU) {
            await this.taoHoSoNguoiHoc(model);
        }
    }

    override async afterUpdate(model: IDanhSachTrungTuyen, body: any): Promise<void> {
        // Sau khi cập nhật thì nếu chuyển từ trạng thái chưa nộp đủ => nộp đủ thì tạo người học
        if (this.modelOld.trangThai == EnumTrangThaiHS.CHUA_NOP
            || this.modelOld.trangThai == EnumTrangThaiHS.NOP_THIEU
        ) {
            if (model.trangThai == EnumTrangThaiHS.NOP_DU) {
                await this.taoHoSoNguoiHoc(model);
            }
        }
    }

    private async taoHoSoNguoiHoc(model: IDanhSachTrungTuyen) {
        // Kiểm tra đã tạo sinh viên với bản ghi trúng tuyển hay chưa
        const exist = await HoSoNguoiHoc.exists({ maSv: model.maSv });
        if (exist) return;

        // Lấy ra các chương trình đào tạo gắn với ngành trúng tuyển của sinh viên
        const lstCtdt = await DM_ChuongTrinhDaoTao.find({
            _id: model.idNganhTrungTuyen
        });

        // Lấy ra 1 lớp hành chính bất kỳ thuộc [chương trình đào tạo của ngành trúng tuyển] của sinh viên
        const itemLopHanhChinhs = (await DanhSachLopHanhChinh.find({
            idChuongTrinhDaoTao: {
                $in: lstCtdt.map(q => q._id)
            }
        }).sort({ created: 1 }).limit(1));
        if (!itemLopHanhChinhs.length) return;
        const itemLopHanhChinh = itemLopHanhChinhs[0];
        const itemNguoiHoc = new HoSoNguoiHoc({
            ...model,
            maSv: model.maSv,
            idLopHanhChinh: itemLopHanhChinh._id,
            idHe: itemLopHanhChinh.idHeDaoTao,
            idKhoaVien: itemLopHanhChinh.idKhoaVien,
            idKhoaHoc: itemLopHanhChinh.idKhoaHoc,
            idNganh: itemLopHanhChinh.idChuongTrinhDaoTao,
            idTrangThai: DefaultIdTrangThaiNguoiHoc,
            ngaySinh: model.ngaySinh
        });

        await itemNguoiHoc.save();
    }

    thongKe = async (req, res: Response) => {
        const [query, filters] = this.createQueryWithFilterFromBody(DM_ChuongTrinhDaoTao, req.body);
        // Lấy ra danh sách chương trình đào tạo có phân trang
        await Promise.all([
            this.ModelType.count(filters),
            query
        ]).then(async ([totalRecord, lstCtdt]) => {
            const result: BaoCaoNhapHoc[] = [];
            const lstIdCtdt = lstCtdt.map(q => q._id.toString());
            const lstSinhVienTrungTuyen = await DanhSachTrungTuyen.find({
                idNganhTrungTuyen: { $in: lstIdCtdt }
            });
            lstCtdt.forEach(itemCtdt => {
                const itemResult = new BaoCaoNhapHoc({
                    id: itemCtdt._id.toString(),
                    soCTDT: itemCtdt.soCTDT,
                    ten: itemCtdt.ten,
                    lstIdSinhVienNopDu: [],
                    lstIdSinhVienNopThieu: [],
                    lstIdSinhVienChuaNop: [],
                    lstIdSinhVienDaRut: []
                });
                // Lấy ra danh sách sinh viên trúng tuyển thuộc ngành
                lstSinhVienTrungTuyen.filter(q => q.idNganhTrungTuyen == itemResult.id)
                    .forEach(itemSinhVien => {
                        if (itemSinhVien.trangThai == EnumTrangThaiHS.CHUA_NOP) {
                            itemResult.lstIdSinhVienChuaNop.push(itemSinhVien._id.toString());
                        }
                        else if (itemSinhVien.trangThai == EnumTrangThaiHS.DA_RUT) {
                            itemResult.lstIdSinhVienDaRut.push(itemSinhVien._id.toString());
                        }
                        else if (itemSinhVien.trangThai == EnumTrangThaiHS.NOP_DU) {
                            itemResult.lstIdSinhVienNopDu.push(itemSinhVien._id.toString());
                        }
                        else if (itemSinhVien.trangThai == EnumTrangThaiHS.NOP_THIEU) {
                            itemResult.lstIdSinhVienNopThieu.push(itemSinhVien._id.toString());
                        }
                    });
                result.push(itemResult);
            });
            return res.status(200).json({
                success: true,
                data: result,
                totalRecord: totalRecord,
            });
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Có lỗi',
                error: err.message,
            });
        });
    };
}
