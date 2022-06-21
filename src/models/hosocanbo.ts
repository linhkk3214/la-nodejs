import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IHoSoCanBo extends IBaseModel {
    ten: String;
    ma: String;
    idKhoaVien: String;
}

const schema = new Schema<IHoSoCanBo>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    idKhoaVien: { type: String, required: true }
});

export default model<IHoSoCanBo>('HoSoCanBo', schema);
