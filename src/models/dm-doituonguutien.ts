import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_DoiTuongUuTien extends IBaseModel {
    ten: String;
    ma: String;
}

const schema = new Schema<IDM_DoiTuongUuTien>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: true },
});

export default model<IDM_DoiTuongUuTien>('DM_DoiTuongUuTien', schema);
