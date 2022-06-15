import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_LoaiDonViTaiTro extends IBaseModel {
    ma: String;
    ten: String;
    ghiChu?: String;
}

const schema = new Schema<IDM_LoaiDonViTaiTro>({
    _id: ObjectId,
    ma: { type: String, required: true },
    ten: { type: String, required: true },
    ghiChu: { type: String, required: false },
});

export default model<IDM_LoaiDonViTaiTro>('DM_LoaiDonViTaiTro', schema);
