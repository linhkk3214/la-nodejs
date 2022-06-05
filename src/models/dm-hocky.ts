import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_HocKy extends IBaseModel {
    idNamHoc: String,
    ten: String,
    tenRutGon?: String,
    hocKy: String,
    tuNgay: Date,
    denNgay: Date,
    loaiHocKy: Number
}

const schema = new Schema<IDM_HocKy>({
    _id: ObjectId,
    idNamHoc: { type: String, required: true },
    ten: { type: String, required: true },
    tenRutGon: { type: String, required: false },
    hocKy: { type: String, required: false },
    tuNgay: { type: Date, required: true },
    denNgay: { type: Date, required: true },
    loaiHocKy: { type: Number, required: true },
});

export default model<IDM_HocKy>('DM_HocKy', schema);
