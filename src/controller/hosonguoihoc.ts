import { BaseController } from '../base/base-controller';
import HoSoNguoiHoc, { IHoSoNguoiHoc } from '../models/hosonguoihoc';
import DanhSachLopHanhChinh from '../models/danhsachlophanhchinh';

export class HoSoNguoiHocController extends BaseController {
    itemOld: IHoSoNguoiHoc;
    constructor() {
        super(HoSoNguoiHoc);
    }

    override async beforeSave(model: IHoSoNguoiHoc, isEdit: boolean = false) {
        model.hoVaTen = `${model.Ho} ${model.Ten}`;
        if (isEdit) {
            this.itemOld = await HoSoNguoiHoc.findOne({ _id: model._id });
        }
    }

    // Cập nhật sĩ số lớp hành chính
    override async afterInsert(model: IHoSoNguoiHoc) {
        if (model.idLopHanhChinh) {
            await this.updateSiSoLopHanhChinh(model.idLopHanhChinh.toString());
        }
    }

    override async afterUpdate(model: IHoSoNguoiHoc) {
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
    }

    private async updateSiSoLopHanhChinh(idLopHanhChinh: string) {
        const count = await HoSoNguoiHoc.count({ idLopHanhChinh: idLopHanhChinh });
        await DanhSachLopHanhChinh.updateOne({ _id: idLopHanhChinh }, {
            $set: {
                siSo: count
            }
        });
    }
    //Cập nhật sĩ số đang học lớp hành chính
}
