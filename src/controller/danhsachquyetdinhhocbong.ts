import { BaseController } from '../base/base-controller';
import DanhSachQuyetDinhHocBong, { IDanhSachQuyetDinhHocBong } from '../models/danhsachquyetdinhhocbong';
import { Request, Response } from 'express';
import { EnumTrangThaiQuyetDinh } from '../base/enums';

export class DanhSachQuyetDinhHocBongController extends BaseController {
    constructor() {
        super(DanhSachQuyetDinhHocBong);
    }

    override async beforeSave(model: IDanhSachQuyetDinhHocBong, isEdit: boolean = false) {
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
        await DanhSachQuyetDinhHocBong.updateOne({ _id: req.params.id }, { $set: { idTrangThai: req.params.idTrangThai } });
        res.status(200).json(<any>{
            success: true
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
