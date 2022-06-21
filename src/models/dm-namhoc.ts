import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_NamHoc extends IBaseModel {
    ten: String,
    nam: Number,
    tuNgay: Date,
    denNgay: Date,
    ghiChu?: String
}

const schema = new Schema<IDM_NamHoc>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    nam: { type: Number, required: true },
    tuNgay: { type: Date, required: true },
    denNgay: { type: Date, required: true },
    ghiChu: { type: String, required: false },
});

export default model<IDM_NamHoc>('DM_NamHoc', schema);
