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
    lstDinhKem?: Array<String>;
}

const schema = new Schema<IDanhSachQuyetDinhHocTap>({
    _id: ObjectId,
    idLoaiQuyetDinh: { type: String, required: true },
    idNamHoc: { type: String, required: true },
    idHocKy: { type: String, required: true },
    soQd: { type: String, required: true },
    chucVuNguoiKy: { type: String, required: false },
    idNguoiKy: { type: String, required: true },
    ngayBanHanh: { type: Date, required: true },
    ngayHieuLuc: { type: Date, required: true },
    lstIdNguoiHoc: Array,
    noiDung: { type: String, required: false },
    lstDinhKem: Array,
});

export default model<IDanhSachQuyetDinhHocTap>('DanhSachQuyetDinhHocTap', schema);
