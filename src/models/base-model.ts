import { ObjectId } from 'mongoose';

export interface IBaseModel {
    _id: ObjectId;
    created: Date;
    modified: Date;
}
