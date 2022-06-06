import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_ChuongTrinhDaoTao extends IBaseModel {
    ten: String;
    soCTDT: String;
    idHeDaoTao: String,
    idKhoaHoc: String,
    idTrinhDoDaoTao: String,
    idNganh: String,
    idKhoaVien: String,
    tongTC: Number,
    soNamDT: Number,
    soNamDTmax: Number
}

const schema = new Schema<IDM_ChuongTrinhDaoTao>({
    _id: ObjectId,
    ten: { type: String, required: true },
    soCTDT: { type: String, required: true },
    idHeDaoTao: { type: String, required: true },
    idKhoaHoc: { type: String, required: true },
    idTrinhDoDaoTao: { type: String, required: true },
    idNganh: { type: String, required: true },
    idKhoaVien: { type: String, required: true },
    tongTC: { type: Number, required: true },
    soNamDT: { type: Number, required: true },
    soNamDTmax: { type: Number, required: true },
});

export default model<IDM_ChuongTrinhDaoTao>('DM_ChuongTrinhDaoTao', schema);
