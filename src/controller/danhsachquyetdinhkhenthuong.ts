import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhKhenThuong, { IDanhSachQuyetDinhKhenThuong } from '../models/danhsachquyetdinhkhenthuong';
import { Request, Response } from 'express';

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

    thongKe = async (req: Request, res: Response) => {
        const body = req.body;
        const filters = this.getFilterFromBody(body.filters);
        let skip = 0, limit = 15;
        if (body.pageInfo) {
            skip = ((body.pageInfo.page - 1) * body.pageInfo.pageSize);
            limit = body.pageInfo.pageSize;
        }
        const namHoc = req.params.idNamHoc;
        filters.idNamHoc = namHoc;
        if (filters.idNguoiHoc && filters.idNguoiHoc.length) {
            const idNguoiHocs = filters.idNguoiHoc;
            delete filters.idNguoiHoc;
            filters.lstIdNguoiHoc = {
                $in: idNguoiHocs
            };
        }
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
