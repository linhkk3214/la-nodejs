import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachLoaiQuyetDinh extends IBaseModel {
    ma: String;
    ten: String;
    trangthainganh1: Number;
    trangthainganh2?: String;
}

const schema = new Schema<IDanhSachLoaiQuyetDinh>({
    _id: ObjectId,
    ma: { type: String, required: true },
    ten: { type: String, required: true },
    trangthainganh1: { type: String, required: true },
    trangthainganh2: { type: String, required: false },
});

export default model<IDanhSachLoaiQuyetDinh>('DanhSachLoaiQuyetDinh', schema);
