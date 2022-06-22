import { BaseController } from '../base/base-controller';
import { EnumTrangThaiNganh2 } from '../base/enums';
import DanhSachDangKyHocNganh2, { IDanhSachDangKyHocNganh2 } from '../models/danhsachdangkyhocnganh2';
import { Request, Response } from 'express';

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

}

