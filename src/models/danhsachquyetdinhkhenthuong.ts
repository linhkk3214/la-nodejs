import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachQuyetDinhKhenThuong extends IBaseModel {
    idLoaiKhenThuong: String;
    lstIdNguoiHoc: Array<String>;
    idNamHoc: String;
    idHocKy: String;
    soQd: String;
    ngayQd?: Date;
    idNguoiKy?: String;
    noiDung?: String;
    lstDinhKem?: Array<String>;
    idTrangThai: Number

}

const schema = new Schema<IDanhSachQuyetDinhKhenThuong>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    idLoaiKhenThuong: { type: String, required: true },
    idNamHoc: { type: String, required: true },
    idHocKy: { type: String, required: true },
    soQd: { type: String, required: false },
    idNguoiKy: { type: String, required: false },
    ngayQd: { type: Date, required: false },
    lstIdNguoiHoc: Array,
    noiDung: { type: String, required: false },
    idTrangThai: { type: Number, required: false },
    lstDinhKem: Array,
});

export default model<IDanhSachQuyetDinhKhenThuong>('DanhSachQuyetDinhKhenThuong', schema);
