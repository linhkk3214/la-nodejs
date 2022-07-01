import { BaseController } from '../base/base-controller';
import { EnumTrangThaiQuyetDinh } from '../base/enums';
import DanhSachSinhVienCapNhatHoSo, { IDanhSachSinhVienCapNhatHoSo } from '../models/danhsachsinhviencapnhathoSo';
import { Request, Response } from 'express';

export class DanhSachSinhVienCapNhatHoSoController extends BaseController {
    constructor() {
        super(DanhSachSinhVienCapNhatHoSo);
    }

    override async beforeSave(model: IDanhSachSinhVienCapNhatHoSo, isEdit: boolean = false) {
        model.idTrangThai = EnumTrangThaiQuyetDinh.CHO_DUYET;
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
        await DanhSachSinhVienCapNhatHoSo.updateOne({ _id: req.params.id }, { $set: { idTrangThai: req.params.idTrangThai } });
        res.status(200).json(<any>{
            success: true
        });
    }
}
