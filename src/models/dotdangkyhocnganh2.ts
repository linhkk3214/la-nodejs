import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDotDangKyHocNganh2 extends IBaseModel {
    ten: String;
    ngayBatDau: Date;
    ngayKetThuc: Date;
    idNamHoc: String;
    idHocKy: String;
    soNgayXacNhan: Number;
    trangThai: Number;
    idHeDaoTaos?: Array<String>;
    idKhoaHocs?: Array<String>;
    idNganhs?: Array<String>;
}

const schema = new Schema<IDotDangKyHocNganh2>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ngayBatDau: { type: Date, required: true },
    ngayKetThuc: { type: Date, required: true },
    idNamHoc: { type: String, required: true },
    idHocKy: { type: String, required: true },
    soNgayXacNhan: { type: Number, required: true },
    trangThai: { type: Number, required: true },
    idHeDaoTaos: Array,
    idKhoaHocs: Array,
    idNganhs: Array
});

export default model<IDotDangKyHocNganh2>('DotDangKyHocNganh2', schema);
