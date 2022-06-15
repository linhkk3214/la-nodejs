import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhKhenThuong, { IDanhSachQuyetDinhKhenThuong } from '../models/danhsachquyetdinhkhenthuong';
import { Request, Response } from 'express';

export class DanhSachQuyetDinhKhenThuongController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhKhenThuong);
    }

    async thongKe(req: Request, res: Response) {
        const body = req.body;
        const namHoc = body.idNamHoc;
        const lstQuyetDinhTrongNam = await DanhSachQuyetDinhKhenThuong.find({ idNamHoc: namHoc });
        const dataKhenThuong: {
            idNguoiHoc: string,
            quyetDinhKhenThuongs: {
                idLoaiKhenThuong: string,
                soQuyetDinhs: string[]
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
                        soQuyetDinhs: []
                    }
                    itemKhenThuong.quyetDinhKhenThuongs.push(itemLoaiKhenThuong);
                }

                itemLoaiKhenThuong.soQuyetDinhs.push(itemQuyetDinh.soQd.toString());
            });
        });
        return res.status(200).json({
            success: true,
            data: dataKhenThuong,
        });
    }
}
