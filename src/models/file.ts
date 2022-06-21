import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IFile extends IBaseModel {
    ten: String,
    url: String,
    extension: String,
}

const schema = new Schema<IFile>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    url: { type: String, required: true },
    extension: { type: String, required: true },
});

export default model<IFile>('File', schema);
