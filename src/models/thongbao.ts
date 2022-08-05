import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IThongBao extends IBaseModel {
    idHes?: Array<String>;
    idKhoaHocs?: Array<String>;
    idChuongTrinhDaoTaos?: Array<String>,
    idLopHanhChinhs?: Array<String>,
    idTrangThaiSinhViens?: Array<String>,
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
    idHes: Array,
    idKhoaHocs: Array,
    idChuongTrinhDaoTaos: Array,
    idLopHanhChinhs: Array,
    idTrangThaiSinhViens: Array,
    lstFileDinhKem: Array
});

export default model<IThongBao>('ThongBao', schema);
