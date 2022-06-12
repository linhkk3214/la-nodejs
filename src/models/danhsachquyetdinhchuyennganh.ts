import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachQuyetDinhChuyenNganh extends IBaseModel {
    idKhoaHoc: String;
    tuNganh: String;
    nguoiHoc: Array<String>;
    sangNganh: String;
    sangLop: String;
    namHocAd: String;
    hocKyAd: String;
    soQd?: String;
    ngayQd?: Date;
    nguoiKy?: String;
    noiDung?: String;
    dinhKem?: Array<String>;
}

const schema = new Schema<IDanhSachQuyetDinhChuyenNganh>({
    _id: ObjectId,
    tuNganh: { type: String, required: true },
    sangNganh: { type: String, required: true },
    sangLop: { type: String, required: true },
    idKhoaHoc: { type: String, required: true },
    namHocAd: { type: String, required: true },
    hocKyAd: { type: String, required: true },
    soQd: { type: String, required: false },
    nguoiKy: { type: String, required: false },
    ngayQd: { type: Date, required: false },
    nguoiHoc: Array,
    noiDung: { type: String, required: false },
    dinhKem: Array,
});

export default model<IDanhSachQuyetDinhChuyenNganh>('DanhSachQuyetDinhChuyenNganh', schema);
