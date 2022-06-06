import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDotNhapHoc extends IBaseModel {
    ten: String,
    ma: String,
    idHeDaoTao: String,
    idKhoaHoc: String,
    timeBd?: Date,
    timeKt?: Date,
    idCoSoDaoTao?: String,
    idDonViLienKet?: String,
    trangThai?: String,
    ghiChu?: String,
}

const schema = new Schema<IDotNhapHoc>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    idHeDaoTao: { type: String, required: true },
    idKhoaHoc: { type: Number, required: true },
    timeBd: { type: Date, required: false },
    timeKt: { type: Date, required: false },
    idCoSoDaoTao: { type: String, required: false },
    idDonViLienKet: { type: String, required: false },
    trangThai: { type: String, required: false },
    ghiChu: { type: String, required: false },
});

export default model<IDotNhapHoc>('DotNhapHoc', schema);
