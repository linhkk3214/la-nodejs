import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface ITemp_Address extends IBaseModel {
    level: number;
    idRoot: String;
    parentId?: String;
    ten: String;
    ma?: String
}

const schema = new Schema<ITemp_Address>({
    _id: ObjectId,
    level: { type: Number, required: true },
    idRoot: { type: String, required: true },
    parentId: { type: String, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: false },
});

export default model<ITemp_Address>('Temp_Address', schema);
