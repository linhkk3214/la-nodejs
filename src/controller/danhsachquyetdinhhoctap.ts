import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhHocTap, { IDanhSachQuyetDinhHocTap } from '../models/danhsachquyetdinhhoctap';
import DanhSachLoaiQuyetDinh from '../models/danhsachloaiquyetdinh';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';
import { Request, Response } from 'express';
import { EnumTrangThaiQuyetDinh } from '../base/enums';

export class DanhSachQuyetDinhHocTapController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhHocTap);
    }

    override async beforeSave(model: IDanhSachQuyetDinhHocTap, isEdit: boolean = false) {
        model.idTrangThai = EnumTrangThaiQuyetDinh.MOI_TAO;
    }

    thayDoiTrangThai = async (req: Request, res: Response) => {
        const idTrangThai = Number(req.params.idTrangThai);
        if (!idTrangThai || idTrangThai == NaN) {
            res.status(200).json(<any>{
                success: false,
                message: 'Bạn chưa truyền trạng thái'
            });
            return;
        }
        await DanhSachQuyetDinhHocTap.updateOne({ _id: req.params.id }, { $set: { idTrangThai: idTrangThai } });
        // Nếu cập nhật trạng thái là đã duyệt thì update trạng thái người học
        if (idTrangThai == EnumTrangThaiQuyetDinh.DA_DUYET) {
            const itemQuyetDinh = await DanhSachQuyetDinhHocTap.findOne({ _id: req.params.id });
            await this.updateTrangThaiNguoiHoc(itemQuyetDinh);
        }
        res.status(200).json(<any>{
            success: true
        });
    }

    async updateTrangThaiNguoiHoc(model: IDanhSachQuyetDinhHocTap) {
        const itemLoaiQuyetDinh = await DanhSachLoaiQuyetDinh.findOne({ _id: model.idLoaiQuyetDinh });
        // Lấy ra các sinh viên có ngành 2
        const lstSinhVienCoNganh2 = await HoSoNguoiHoc.find({
            _id: { $in: model.lstIdNguoiHoc },
            idNganh2: { $ne: null }
        }, { _id: 1 });
        const lstIdSinhVienCoNganh2 = lstSinhVienCoNganh2.map(q => q._id);
        const lstIdSinhVienChiCoNganh1 = [];
        model.lstIdNguoiHoc.forEach(idNguoiHoc => {
            if (!lstIdSinhVienCoNganh2.some(x => x.toString() == idNguoiHoc)) {
                lstIdSinhVienChiCoNganh1.push(idNguoiHoc);
            }
        });
        if (lstIdSinhVienChiCoNganh1.length) {
            await HoSoNguoiHoc.updateMany({ _id: { $in: lstIdSinhVienChiCoNganh1 } }, {
                $set: {
                    idTrangThai: itemLoaiQuyetDinh.trangThaiNganh1
                }
            });
        }

        if (lstIdSinhVienCoNganh2.length) {
            await HoSoNguoiHoc.updateMany({ _id: { $in: lstIdSinhVienCoNganh2 } }, {
                $set: {
                    idTrangThaiNganh2: itemLoaiQuyetDinh.trangThaiNganh2
                }
            });
        }
    }

    thongKe = async (req: Request, res: Response) => {
        const body = req.body;
        const filters = this.getFilterFromBody(body.filters);
        // Chỉ thống kê những quyết định có trạng thái đã duyệt
        filters.idTrangThai = EnumTrangThaiQuyetDinh.DA_DUYET;
        let skip = 0, limit = 15;
        if (body.pageInfo) {
            skip = ((body.pageInfo.page - 1) * body.pageInfo.pageSize);
            limit = body.pageInfo.pageSize;
        }
        const namHoc = req.params.idNamHoc;
        filters.idNamHoc = namHoc;

        // #region Chuyển filter mã sinh viên, tên sinh viên => filter theo id người học trong bảng quyết định
        let hasFilterNguoiHoc = false;
        const filterNguoiHoc: any = {};
        if (filters.hoVaTen) {
            filterNguoiHoc.hoVaTen = filters.hoVaTen;
            delete filters.hoVaTen;
            hasFilterNguoiHoc = true;
        }

        if (filters.maSv) {
            filterNguoiHoc.maSv = filters.maSv;
            delete filters.maSv;
            hasFilterNguoiHoc = true;
        }

        if (hasFilterNguoiHoc) {
            const lstNguoiHocByFilter = await HoSoNguoiHoc.find(filterNguoiHoc, { _id: 1 });
            if (!lstNguoiHocByFilter.length) {
                return res.status(200).json({
                    success: true,
                    data: [],
                    totalRecord: 0
                });
            }
            const lstIdNguoiHocByMaSv = lstNguoiHocByFilter.map(q => q._id.toString());
            filters.lstIdNguoiHoc = {
                $in: lstIdNguoiHocByMaSv
            };
        }
        // #endregion

        const lstQuyetDinhTrongNam = await DanhSachQuyetDinhHocTap.find(filters);
        const dataQuyetDinh: {
            idNguoiHoc: string,
            idLoaiQuyetDinh: string,
            soQuyetDinh: string,
            ngayQuyetDinh: Date
        }[] = [];

        lstQuyetDinhTrongNam.forEach(itemQuyetDinh => {
            itemQuyetDinh.lstIdNguoiHoc.forEach(idNguoiHoc => {
                dataQuyetDinh.push({
                    idNguoiHoc: idNguoiHoc.toString(),
                    idLoaiQuyetDinh: itemQuyetDinh.idLoaiQuyetDinh.toString(),
                    soQuyetDinh: itemQuyetDinh.soQd.toString(),
                    ngayQuyetDinh: itemQuyetDinh.ngayBanHanh
                });
            });
        });
        const count = dataQuyetDinh.length;
        dataQuyetDinh.splice(0, skip);
        const result = dataQuyetDinh.splice(0, limit);
        return res.status(200).json({
            success: true,
            data: result,
            totalRecord: count
        });
    }
}
