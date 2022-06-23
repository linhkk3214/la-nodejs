import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IThongBao extends IBaseModel {
    idHe?: Array<String>;
    idKhoaHoc?: Array<String>;
    idChuongTrinhDaoTao?: Array<String>,
    idLopHanhChinh?: Array<String>,
    idTrangThaiSinhVien?: Array<String>,
    idLoaiThongBao: Number,
    idMucDoThongBao: Number;
    tieuDe: String;
    noiDung?: String;
    ngayPhatHanh?: Date;
    moTaNgan?: String;
    lstFileDinhKem?: Array<String>
}

const schema = new Schema<IThongBao>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    tieuDe: { type: String, required: true },
    idLoaiThongBao: { type: Number, required: true },
    idMucDoThongBao: { type: Number, required: true },
    noiDung: { type: String, required: false },
    ngayPhatHanh: { type: Date, required: false },
    moTaNgan: { type: String, required: false },
    idHe: Array,
    idKhoaHoc: Array,
    idChuongTrinhDaoTao: Array,
    idLopHanhChinh: Array,
    idTrangThaiSinhVien: Array,
    lstFileDinhKem: Array
});

export default model<IThongBao>('ThongBao', schema);
