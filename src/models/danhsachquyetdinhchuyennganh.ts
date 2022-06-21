import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachQuyetDinhChuyenNganh extends IBaseModel {
    idKhoaHoc: String;
    idNganhHienTai: String;
    lstIdNguoiHoc: Array<String>;
    idNganhChuyen: String;
    idLopChuyen: String;
    idNamHocAd: String;
    idHocKyAd: String;
    soQd?: String;
    ngayQd?: Date;
    idNguoiKy?: String;
    noiDung?: String;
    lstDinhKem?: Array<String>;
}

const schema = new Schema<IDanhSachQuyetDinhChuyenNganh>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    idNganhHienTai: { type: String, required: true },
    idNganhChuyen: { type: String, required: true },
    idLopChuyen: { type: String, required: true },
    idKhoaHoc: { type: String, required: true },
    idNamHocAd: { type: String, required: true },
    idHocKyAd: { type: String, required: true },
    soQd: { type: String, required: false },
    idNguoiKy: { type: String, required: false },
    ngayQd: { type: Date, required: false },
    lstIdNguoiHoc: Array,
    noiDung: { type: String, required: false },
    lstDinhKem: Array,
});

export default model<IDanhSachQuyetDinhChuyenNganh>('DanhSachQuyetDinhChuyenNganh', schema);
