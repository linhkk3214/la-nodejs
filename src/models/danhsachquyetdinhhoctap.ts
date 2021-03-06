import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachQuyetDinhHocTap extends IBaseModel {
    idLoaiQuyetDinh: String;
    lstIdNguoiHoc: Array<String>;
    idNamHoc: String;
    idHocKy: String;
    soQd: String;
    ngayBanHanh: Date;
    idNguoiKy: String;
    chucVuNguoiKy?: String;
    ngayHieuLuc: Date;
    noiDung?: String;
    idTrangThai: Number,
    lstDinhKem?: Array<String>;
}

const schema = new Schema<IDanhSachQuyetDinhHocTap>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    idLoaiQuyetDinh: { type: String, required: true },
    idNamHoc: { type: String, required: true },
    idHocKy: { type: String, required: true },
    soQd: { type: String, required: false },
    chucVuNguoiKy: { type: String, required: false },
    idNguoiKy: { type: String, required: false },
    ngayBanHanh: { type: Date, required: false },
    ngayHieuLuc: { type: Date, required: false },
    lstIdNguoiHoc: Array,
    noiDung: { type: String, required: false },
    lstDinhKem: Array,
    idTrangThai: { type: Number, require: true }
});

export default model<IDanhSachQuyetDinhHocTap>('DanhSachQuyetDinhHocTap', schema);
