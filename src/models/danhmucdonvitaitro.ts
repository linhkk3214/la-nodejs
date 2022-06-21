import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhMucDonViTaiTro extends IBaseModel {
    ma: String;
    ten: String;
    idLoaiDonVi: String,
    diaChi?: String,
    sdt?: String,
    email?: String,
    nguoiDaiDien?: String;
    ghiChu?: String;
}

const schema = new Schema<IDanhMucDonViTaiTro>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ma: { type: String, required: true },
    ten: { type: String, required: true },
    idLoaiDonVi: { type: String, required: true },
    diaChi: { type: String, required: false },
    sdt: { type: String, required: false },
    email: { type: String, required: false },
    nguoiDaiDien: { type: String, required: false },
    ghiChu: { type: String, required: false },
});

export default model<IDanhMucDonViTaiTro>('DanhMucDonViTaiTro', schema);
