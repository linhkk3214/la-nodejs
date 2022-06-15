import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhMucHocBong extends IBaseModel {
    ma: String;
    ten: String;
    idDonViTaiTro: String;
    soSuat: Number;
    soTienMoiSuat: Number;
    idNamHoc: String;
    idHocKy: String;
}

const schema = new Schema<IDanhMucHocBong>({
    _id: ObjectId,
    ma: { type: String, required: true },
    ten: { type: String, required: true },
    idDonViTaiTro: { type: String, required: true },
    soSuat: { type: Number, required: true },
    soTienMoiSuat: { type: Number, required: true },
    idNamHoc: { type: String, required: true },
    idHocKy: { type: String, required: true },
});

export default model<IDanhMucHocBong>('DanhMucHocBong', schema);
