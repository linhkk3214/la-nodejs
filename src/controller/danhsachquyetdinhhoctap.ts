import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhHocTap, { IDanhSachQuyetDinhHocTap } from '../models/danhsachquyetdinhhoctap';
import DanhSachLoaiQuyetDinh from '../models/danhsachloaiquyetdinh';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';
import { Request, Response } from 'express';

export class DanhSachQuyetDinhHocTapController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhHocTap);
    }

    override async afterInsert(model: IDanhSachQuyetDinhHocTap) {
        const itemLoaiQuyetDinh = await DanhSachLoaiQuyetDinh.findOne({ _id: model.idLoaiQuyetDinh });
        await HoSoNguoiHoc.updateMany({ _id: { $in: model.lstIdNguoiHoc } }, {
            $set: {
                idTrangThai: itemLoaiQuyetDinh.trangThaiNganh1,
                idTrangThaiNganh2: itemLoaiQuyetDinh.trangThaiNganh2
            }
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
