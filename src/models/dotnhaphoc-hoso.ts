import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDotNhapHoc_HoSo extends IBaseModel {
    idDotNhapHoc: String,
    idTpHoSo: String,
    soLuongBanChinh: Number,
    soLuongBanSao: Number,
    soLuongBanCC: Number,
}

const schema = new Schema<IDotNhapHoc_HoSo>({
    _id: ObjectId,
    idDotNhapHoc: { type: String, required: true },
    idTpHoSo: { type: String, required: true },
    soLuongBanChinh: { type: Number, required: true },
    soLuongBanSao: { type: Number, required: true },
    soLuongBanCC: { type: Number, required: true },
});

export default model<IDotNhapHoc_HoSo>('DotNhapHoc_HoSo', schema);
