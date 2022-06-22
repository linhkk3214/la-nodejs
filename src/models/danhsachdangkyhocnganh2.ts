import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachDangKyHocNganh2 extends IBaseModel {
    idNguoiHoc: String;
    idDotDangKy: String;
    idNganhDangKy: String,
    trangThai: Number,
    synced: Boolean,
}

const schema = new Schema<IDanhSachDangKyHocNganh2>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    idNguoiHoc: { type: String, required: true },
    idDotDangKy: { type: String, required: true },
    idNganhDangKy: { type: String, required: true },
    trangThai: { type: Number, required: false },
    synced: { type: Boolean, required: false }
});

export default model<IDanhSachDangKyHocNganh2>('DanhSachDangKyHocNganh2', schema);
