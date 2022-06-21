import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachLoaiQuyetDinh extends IBaseModel {
    ma: String;
    ten: String;
    trangThaiNganh1: Number;
    trangThaiNganh2?: String;
}

const schema = new Schema<IDanhSachLoaiQuyetDinh>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ma: { type: String, required: true },
    ten: { type: String, required: true },
    trangThaiNganh1: { type: String, required: true },
    trangThaiNganh2: { type: String, required: false },
});

export default model<IDanhSachLoaiQuyetDinh>('DanhSachLoaiQuyetDinh', schema);
