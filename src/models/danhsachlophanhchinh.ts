import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachLopHanhChinh extends IBaseModel {
    ten: String;
    ma: String;
    idHeDaoTao: String;
    idKhoaHoc: String;
    idKhoaVien: String;
    idChuongTrinhDaoTao: String;
    idGVCN?: String;
    idCVHT?: Array<String>;
    siSo?: Number;
}

const schema = new Schema<IDanhSachLopHanhChinh>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    idHeDaoTao: { type: String, required: true },
    idKhoaHoc: { type: String, required: true },
    idKhoaVien: { type: String, required: true },
    idChuongTrinhDaoTao: { type: String, required: true },
    idGVCN: { type: String, required: false },
    idCVHT: Array,
    siSo: { type: Number, required: false },
});

export default model<IDanhSachLopHanhChinh>('DanhSachLopHanhChinh', schema);
