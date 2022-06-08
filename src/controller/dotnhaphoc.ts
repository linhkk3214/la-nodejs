import mongoose from 'mongoose';
import { BaseController } from '../base/base-controller';
import DotNhapHoc from '../models/dotnhaphoc';
import DotNhapHoc_TpHoSo from '../models/dotnhaphoc-tphoso';

export class DotNhapHocController extends BaseController {
    constructor() {
        super(DotNhapHoc);
    }

    override async afterUpdate(model: any, body: any) {
        const lstDanhSach = body.danhSach;
        // Lấy ra các danh sách hiện có
        const lstDanhSachOld = await DotNhapHoc_TpHoSo.find({ idDotNhapHoc: model._id });
        const lstDanhSachInsert = [];
        const lstDanhSachUpdate = [];
        lstDanhSach.forEach(itemDanhSach => {
            const itemDanhSachOld = lstDanhSachOld.find(q => q._id == itemDanhSach._id);
            if (!itemDanhSachOld) {
                itemDanhSach._id = new mongoose.Types.ObjectId();
                itemDanhSach.idDotNhapHoc = model._id;
                lstDanhSachInsert.push(itemDanhSach);
            }
            else {
                lstDanhSachUpdate.push(itemDanhSach);
            }
        });

        if (lstDanhSachInsert.length > 0) {
            await DotNhapHoc_TpHoSo.insertMany(lstDanhSachInsert);
        }
        if (lstDanhSachUpdate.length > 0) {
            for (const itemUpdate of lstDanhSachUpdate) {
                await DotNhapHoc_TpHoSo.updateOne({ _id: itemUpdate._id }, { $set: { ...itemUpdate } });
            }
        }
        const lstIdDelete = lstDanhSachOld.filter(q => !lstDanhSach.some(x => x._id == q._id)).map(q => q._id);
        if (lstIdDelete.length) {
            await DotNhapHoc_TpHoSo.deleteMany({ _id: { $in: lstIdDelete } });
        }
    }
}
