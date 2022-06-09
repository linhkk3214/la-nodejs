import mongoose from 'mongoose';
import { BaseController } from '../base/base-controller';
import DotNhapHoc from '../models/dotnhaphoc';
import DotNhapHoc_TpHoSo from '../models/dotnhaphoc-tphoso';

export class DotNhapHocController extends BaseController {
    constructor() {
        super(DotNhapHoc);
    }

    override async afterInsert(model: any, body: any): Promise<void> {
        const lstDanhSach = body.danhSach;
        if (lstDanhSach && lstDanhSach.length) {
            lstDanhSach.forEach(itemDanhSach => {
                itemDanhSach.idDotNhapHoc = model._id;
                itemDanhSach._id = new mongoose.Types.ObjectId();
            });
            await DotNhapHoc_TpHoSo.insertMany(lstDanhSach);
        }
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
        // Các bản ghi cần xóa thì sẽ là danh sách các bản ghi đã có trong csdl (cái này là các bản ghi thành phần hồ sơ của đợt này)
        // Nhưng _id của nó k tồn tại trong danh sách được gửi lên từ client thế chỗ này là sao á
        // Sau khi xác định được các bản ghi cần xóa thì xóa thui
        const lstIdDelete = lstDanhSachOld.filter(q => !lstDanhSach.some(x => x._id == q._id)).map(q => q._id);
        if (lstIdDelete.length) {
            await DotNhapHoc_TpHoSo.deleteMany({ _id: { $in: lstIdDelete } });
        }
    }
}
