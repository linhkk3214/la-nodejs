import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_TpHoSo extends IBaseModel {
    ten: String,
    ma: String,
    tenKhiNopOnline: String,
    ghiChu?: String,
    idLoaiGiayTo: String,
}

const schema = new Schema<IDM_TpHoSo>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    tenKhiNopOnline: { type: String, required: true },
    ghiChu: { type: String, required: false },
    idLoaiGiayTo: { type: String, required: true },
});

export default model<IDM_TpHoSo>('DM_TpHoSo', schema);
