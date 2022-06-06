import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDotNhapHoc_TpHoSo extends IBaseModel {
    idDotNhapHoc: String,
    idTpHoSo: String,
    soLuongBanChinh: Number,
    soLuongBanSao: Number,
    soLuongBanCC: Number,
    nopOnline: Boolean,
    nopTrucTiep: Boolean,
}

const schema = new Schema<IDotNhapHoc_TpHoSo>({
    _id: ObjectId,
    idDotNhapHoc: { type: String, required: true },
    idTpHoSo: { type: String, required: true },
    soLuongBanChinh: { type: Number, required: true },
    soLuongBanSao: { type: Number, required: true },
    soLuongBanCC: { type: Number, required: true },
    nopOnline: { type: Boolean, required: true },
    nopTrucTiep: { type: Boolean, required: true },
});

export default model<IDotNhapHoc_TpHoSo>('DotNhapHoc_TpHoSo', schema);
