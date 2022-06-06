import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IAddress extends IBaseModel {
    idOld: String;
    level: number;
    parentId?: String;
    ten: String;
}

const schema = new Schema<IAddress>({
    _id: ObjectId,
    idOld: { type: String, required: true },
    level: { type: Number, required: true },
    parentId: { type: String, required: false },
    ten: { type: String, required: true },
});

export default model<IAddress>('Address', schema);
