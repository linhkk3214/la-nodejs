import { BaseController } from '../base/base-controller';
import { EnumTrangThaiNganh2 } from '../base/enums';
import DanhSachDangKyHocNganh2, { IDanhSachDangKyHocNganh2 } from '../models/danhsachdangkyhocnganh2';
import { Request, Response } from 'express';
import DM_KhoaVien from '../models/dm-khoavien';
import { BaoCaoSinhVienDkNganh2 } from '../models/baocao';
import DM_ChuongTrinhDaoTao from '../models/dm-chuongtrinhdaotao';
import HoSoNguoiHoc from '../models/hosonguoihoc';

export class DanhSachDangKyHocNganh2Controller extends BaseController {
    constructor() {
        super(DanhSachDangKyHocNganh2);
    }

    override async beforeSave(model: IDanhSachDangKyHocNganh2, isEdit: boolean = false) {
        model.trangThai = EnumTrangThaiNganh2.CHO_DUYET;
    }

    thayDoiTrangThai = async (req: Request, res: Response) => {
        const trangThai = Number(req.params.trangThai);
        if (!trangThai || trangThai == NaN) {
            res.status(200).json(<any>{
                success: false,
                message: 'Bạn chưa truyền trạng thái'
            });
            return;
        }
        await DanhSachDangKyHocNganh2.updateOne({ _id: req.params.id }, { $set: { trangThai: req.params.trangThai } });
        res.status(200).json(<any>{
            success: true
        });
    }

    thongKeTheoDonVi2 = async (req, res: Response) => {
        const [query, filters] = this.createQueryWithFilterFromBody(DM_KhoaVien, req.body);
        // Lấy ra danh sách khoa viện có phân trang
        await Promise.all([
            this.ModelType.count(filters),
            query
        ]).then(async ([totalRecord, lstKhoaVien]) => {
            const result: BaoCaoSinhVienDkNganh2[] = [];
            const lstIdKhoaVien = lstKhoaVien.map(q => q._id.toString());
            // Lấy ra danh sách ngành thuộc khoa viện
            const lstThuocKhoaVien = await DM_ChuongTrinhDaoTao.find({
                idKhoaVien: { $in: lstIdKhoaVien }
            });
            const lstIdNganhThuocKhoaVien = lstThuocKhoaVien.map(q => q._id.toString())
            //Lấy ra danh sách sinh viên thuộc ngành
            const lstSinhVienDkNganh2 = await DanhSachDangKyHocNganh2.find({
                idNganhDangKy: { $in: lstIdNganhThuocKhoaVien },
                trangThai: EnumTrangThaiNganh2.DA_NHAP_HOC
            });
            lstKhoaVien.forEach(itemKhoaVien => {
                const itemResult = new BaoCaoSinhVienDkNganh2({
                    id: itemKhoaVien._id.toString(),
                    ten: itemKhoaVien.ten,
                    lstIdNguoiHoc: []
                });
                lstThuocKhoaVien.filter(q => q.idKhoaVien == itemResult.id).forEach(itemNganh => {
                    // Lấy ra danh sách sinh viên đăng ký ngành 2 thuộc ngành
                    lstSinhVienDkNganh2.filter(q => q.idNganhDangKy == itemNganh._id.toString()).forEach(itemDangKy => {
                        itemResult.lstIdNguoiHoc.push(itemDangKy.idNguoiHoc.toString());
                    });
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

    thongKeTheoDonVi1 = async (req, res: Response) => {
        const [query, filters] = this.createQueryWithFilterFromBody(DM_KhoaVien, req.body);
        // Lấy ra danh sách khoa viện có phân trang
        await Promise.all([
            this.ModelType.count(filters),
            query
        ]).then(async ([totalRecord, lstKhoaVien]) => {
            const result: BaoCaoSinhVienDkNganh2[] = [];
            const lstIdKhoaVien = lstKhoaVien.map(q => q._id.toString());
            // Lấy ra danh sách sinh viên thuộc khoa viện
            const lstSvThuocKhoaVien = await HoSoNguoiHoc.find({
                idKhoaVien: { $in: lstIdKhoaVien }
            });
            const lstIdNguoiHocThuocKhoaVien = lstSvThuocKhoaVien.map(q => q._id.toString())
            const lstSinhVienDkNganh2 = await DanhSachDangKyHocNganh2.find({
                idNguoiHoc: { $in: lstIdNguoiHocThuocKhoaVien },
                trangThai: EnumTrangThaiNganh2.DA_NHAP_HOC
            });
            lstKhoaVien.forEach(itemKhoaVien => {
                const itemResult = new BaoCaoSinhVienDkNganh2({
                    id: itemKhoaVien._id.toString(),
                    ten: itemKhoaVien.ten,
                    lstIdNguoiHoc: [],
                });
                lstSvThuocKhoaVien.filter(q => q.idKhoaVien == itemResult.id).forEach(itemNguoiHoc => {
                    if (!lstSinhVienDkNganh2.some(x => x.idNguoiHoc == itemNguoiHoc._id.toString())) return;
                    itemResult.lstIdNguoiHoc.push(itemNguoiHoc._id.toString());
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

