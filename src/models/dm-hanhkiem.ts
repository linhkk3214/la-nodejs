import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_HanhKiem extends IBaseModel {
    ten: String;
    ma: String;
}

const schema = new Schema<IDM_HanhKiem>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
});

export default model<IDM_HanhKiem>('DM_HanhKiem', schema);
