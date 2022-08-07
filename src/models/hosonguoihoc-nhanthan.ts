import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IHoSoNguoiHoc_NhanThan extends IBaseModel {
    idNguoiHoc: String,
    idMoiQuanHe: Number,
    tenNhanThan: String,
    ngaySinhNhanThan: Date,
    ngheNghiepNhanThan: String,
    sdtNhanThan: String,
    emailNhanThan: String,
    noiONhanThan: String
}

const schema = new Schema<IHoSoNguoiHoc_NhanThan>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    idNguoiHoc: { type: String, required: false },
    idMoiQuanHe: { type: Number, required: false },
    tenNhanThan: { type: String, required: false },
    ngaySinhNhanThan: { type: Date, required: false },
    ngheNghiepNhanThan: { type: String, required: false },
    sdtNhanThan: { type: String, required: false },
    emailNhanThan: { type: String, required: false },
    noiONhanThan: { type: String, required: false }
});

export default model<IHoSoNguoiHoc_NhanThan>('HoSoNguoiHoc_NhanThan', schema);
