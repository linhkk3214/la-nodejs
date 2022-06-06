import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_DoiTuongTuyenSinh extends IBaseModel {
    ten: String;
    ma: String;
}

const schema = new Schema<IDM_DoiTuongTuyenSinh>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
});

export default model<IDM_DoiTuongTuyenSinh>('DM_DoiTuongTuyenSinh', schema);
