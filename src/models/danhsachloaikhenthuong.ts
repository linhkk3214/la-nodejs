import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDanhSachLoaiKhenThuong extends IBaseModel {
    ma: String;
    ten: String;
    soTien?: Number;
    ghiChu?: String;
}

const schema = new Schema<IDanhSachLoaiKhenThuong>({
    _id: ObjectId,
    ma: { type: String, required: true },
    ten: { type: String, required: true },
    soTien: { type: Number, required: false },
    ghiChu: { type: String, required: false },
});

export default model<IDanhSachLoaiKhenThuong>('DanhSachLoaiKhenThuong', schema);
