import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_TrangThaiNguoiHoc extends IBaseModel {
    ten: String,
    ma: String,
    ghiChu?: String,
}

const schema = new Schema<IDM_TrangThaiNguoiHoc>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    ghiChu: { type: String, required: false },
});

export default model<IDM_TrangThaiNguoiHoc>('DM_TrangThaiNguoiHoc', schema);
