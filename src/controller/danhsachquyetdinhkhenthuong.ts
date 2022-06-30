import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhKhenThuong, { IDanhSachQuyetDinhKhenThuong } from '../models/danhsachquyetdinhkhenthuong';
import { Request, Response } from 'express';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';
import { EnumTrangThaiQuyetDinh } from '../base/enums';
import DanhMucHoc from '../models/danhmuchocbong';

export class DanhSachQuyetDinhKhenThuongController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhKhenThuong);
    }

    async thongKeOld(req: Request, res: Response) {
        const body = req.body;
        const namHoc = body.idNamHoc;
        const lstQuyetDinhTrongNam = await DanhSachQuyetDinhKhenThuong.find({ idNamHoc: namHoc });
        const dataKhenThuong: {
            idNguoiHoc: string,
            quyetDinhKhenThuongs: {
                idLoaiKhenThuong: string,
                soQuyetDinhs: string[],
                ngayQuyetDinh: String[]
            }[]
        }[] = [];

        lstQuyetDinhTrongNam.forEach(itemQuyetDinh => {
            itemQuyetDinh.lstIdNguoiHoc.forEach(idNguoiHoc => {
                let itemKhenThuong = dataKhenThuong.find(q => q.idNguoiHoc == idNguoiHoc);
                if (!itemKhenThuong) {
                    itemKhenThuong = {
                        idNguoiHoc: idNguoiHoc.toString(),
                        quyetDinhKhenThuongs: []
                    };
                    dataKhenThuong.push(itemKhenThuong);
                }

                let itemLoaiKhenThuong = itemKhenThuong.quyetDinhKhenThuongs.find(q => q.idLoaiKhenThuong == itemQuyetDinh.idLoaiKhenThuong);
                if (!itemLoaiKhenThuong) {
                    itemLoaiKhenThuong = {
                        idLoaiKhenThuong: itemQuyetDinh.idLoaiKhenThuong.toString(),
                        soQuyetDinhs: [],
                        ngayQuyetDinh: [],
                    };
                    itemKhenThuong.quyetDinhKhenThuongs.push(itemLoaiKhenThuong);
                }

                itemLoaiKhenThuong.soQuyetDinhs.push(itemQuyetDinh.soQd.toString());
                itemLoaiKhenThuong.ngayQuyetDinh.push(itemQuyetDinh.ngayQd.toDateString());
            });
        });
        return res.status(200).json({
            success: true,
            data: dataKhenThuong,
        });
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
        await DanhSachQuyetDinhKhenThuong.updateOne({ _id: req.params.id }, { $set: { idTrangThai: req.params.idTrangThai } });
        res.status(200).json(<any>{
            success: true
        });
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

        const lstQuyetDinhTrongNam = await DanhSachQuyetDinhKhenThuong.find(filters);
        const dataKhenThuong: {
            idNguoiHoc: string,
            idLoaiKhenThuong: string,
            soQuyetDinh: string,
            ngayQuyetDinh: Date
        }[] = [];

        lstQuyetDinhTrongNam.forEach(itemQuyetDinh => {
            itemQuyetDinh.lstIdNguoiHoc.forEach(idNguoiHoc => {
                dataKhenThuong.push({
                    idNguoiHoc: idNguoiHoc.toString(),
                    idLoaiKhenThuong: itemQuyetDinh.idLoaiKhenThuong.toString(),
                    soQuyetDinh: itemQuyetDinh.soQd.toString(),
                    ngayQuyetDinh: itemQuyetDinh.ngayQd
                });
            });
        });
        const count = dataKhenThuong.length;
        dataKhenThuong.splice(0, skip);
        const result = dataKhenThuong.splice(0, limit);
        return res.status(200).json({
            success: true,
            data: result,
            totalRecord: count
        });
    }
}
