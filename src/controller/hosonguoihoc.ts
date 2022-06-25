import { BaseController } from '../base/base-controller';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';
import DanhSachLopHanhChinh from '../models/danhsachlophanhchinh';
import HoSoNguoiHoc_NhanThan from '../models/hosonguoihoc-nhanthan';
import mongoose from 'mongoose';

export class HoSoNguoiHocController extends BaseController {
    itemOld: IHoSoNguoiHoc;
    constructor() {
        super(HoSoNguoiHoc);
    }

    override async beforeSave(model: IHoSoNguoiHoc, isEdit: boolean = false) {
        model.hoVaTen = `${model.ho} ${model.ten}`;
        if (isEdit) {
            this.itemOld = await HoSoNguoiHoc.findOne({ _id: model._id });
        }
    }

    // Cập nhật sĩ số lớp hành chính
    override async afterInsert(model: IHoSoNguoiHoc, body: any) {
        if (model.idLopHanhChinh) {
            await this.updateSiSoLopHanhChinh(model.idLopHanhChinh.toString());
        }

        const lstDanhSach = body.danhSachNhanThan;
        if (lstDanhSach && lstDanhSach.length) {
            lstDanhSach.forEach(itemDanhSach => {
                itemDanhSach.idNguoiHoc = model._id;
                itemDanhSach._id = new mongoose.Types.ObjectId();
            });
            await HoSoNguoiHoc_NhanThan.insertMany(lstDanhSach);
        }
    }

    override async afterUpdate(model: IHoSoNguoiHoc, body: any) {
        if (this.itemOld) {
            if (this.itemOld.idLopHanhChinh != model.idLopHanhChinh) {
                if (model.idLopHanhChinh) {
                    await this.updateSiSoLopHanhChinh(model.idLopHanhChinh.toString());
                }
                if (this.itemOld.idLopHanhChinh) {
                    await this.updateSiSoLopHanhChinh(this.itemOld.idLopHanhChinh.toString());
                }
            }
        }
        else if (model.idLopHanhChinh) {
            await this.updateSiSoLopHanhChinh(model.idLopHanhChinh.toString());
        }

        const lstDanhSach = body.danhSachNhanThan;
        // Lấy ra các danh sách hiện có
        const lstDanhSachOld = await HoSoNguoiHoc_NhanThan.find({ idNguoiHoc: model._id });
        const lstDanhSachInsert = [];
        const lstDanhSachUpdate = [];
        lstDanhSach.forEach(itemDanhSach => {
            const itemDanhSachOld = lstDanhSachOld.find(q => q._id == itemDanhSach._id);
            if (!itemDanhSachOld) {
                itemDanhSach._id = new mongoose.Types.ObjectId();
                itemDanhSach.created = new Date();
                itemDanhSach.idNguoiHoc = model._id;
                lstDanhSachInsert.push(itemDanhSach);
            }
            else {
                itemDanhSach.modified = new Date();
                lstDanhSachUpdate.push(itemDanhSach);
            }
        });

        if (lstDanhSachInsert.length > 0) {
            await HoSoNguoiHoc_NhanThan.insertMany(lstDanhSachInsert);
        }
        if (lstDanhSachUpdate.length > 0) {
            for (const itemUpdate of lstDanhSachUpdate) {
                await HoSoNguoiHoc_NhanThan.updateOne({ _id: itemUpdate._id }, { $set: { ...itemUpdate } });
            }
        }
        const lstIdDelete = lstDanhSachOld.filter(q => !lstDanhSach.some(x => x._id == q._id)).map(q => q._id);
        if (lstIdDelete.length) {
            await HoSoNguoiHoc_NhanThan.deleteMany({ _id: { $in: lstIdDelete } });
        }
    }

    private async updateSiSoLopHanhChinh(idLopHanhChinh: string) {
        const count = await HoSoNguoiHoc.count({ idLopHanhChinh: idLopHanhChinh });
        await DanhSachLopHanhChinh.updateOne({ _id: idLopHanhChinh }, {
            $set: {
                siSo: count
            }
        });
    }
}
