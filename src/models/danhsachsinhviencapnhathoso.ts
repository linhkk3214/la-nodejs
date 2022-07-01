import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachSinhVienCapNhatHoSo extends IBaseModel {
    idDot: String;
    idNguoiHoc: String;
    idTrangThai: Number,
}

const schema = new Schema<IDanhSachSinhVienCapNhatHoSo>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    idDot: { type: String, required: true },
    idNguoiHoc: { type: String, required: true },
    idTrangThai: { type: Number, required: true },
});

export default model<IDanhSachSinhVienCapNhatHoSo>('DanhSachSinhVienCapNhatHoSo', schema);
