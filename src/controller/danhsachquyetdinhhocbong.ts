import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhHocBong, { IDanhSachQuyetDinhHocBong } from '../models/danhsachquyetdinhhocbong';
import { Request, Response } from 'express';

export class DanhSachQuyetDinhHocBongController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhHocBong);
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
        const lstQuyetDinhTrongNam = await DanhSachQuyetDinhHocBong.find(filters);
        const dataQuyetDinh: {
            idNguoiHoc: string,
            idHocBong: string,
            soQuyetDinh: string,
            ngayQuyetDinh: Date
        }[] = [];

        lstQuyetDinhTrongNam.forEach(itemQuyetDinh => {
            itemQuyetDinh.lstIdNguoiHoc.forEach(idNguoiHoc => {
                dataQuyetDinh.push({
                    idNguoiHoc: idNguoiHoc.toString(),
                    idHocBong: itemQuyetDinh.idHocBong.toString(),
                    soQuyetDinh: itemQuyetDinh.soQd.toString(),
                    ngayQuyetDinh: itemQuyetDinh.ngayQd
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
