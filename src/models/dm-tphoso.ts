import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_TpHoSo extends IBaseModel {
    ten: String,
    ma: String,
    tenKhiNopOnline: String,
    soLuongBanChinh: Number,
    soLuongBanSao: Number,
    soLuongBanCC: Number,
    ghiChu?: String,
    thuocDoiTuongUuTien: String,
    thuocNghiaVuQuanSu: String,
    idLoaiGiayTo: String,
}

const schema = new Schema<IDM_TpHoSo>({
    _id: ObjectId,
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    tenKhiNopOnline: { type: String, required: true },
    soLuongBanChinh: { type: Number, required: true },
    soLuongBanSao: { type: Number, required: true },
    soLuongBanCC: { type: Number, required: true },
    ghiChu: { type: String, required: false },
    thuocDoiTuongUuTien: { type: String, required: true },
    thuocNghiaVuQuanSu: { type: String, required: true },
    idLoaiGiayTo: { type: String, required: true },
});

export default model<IDM_TpHoSo>('DM_TpHoSo', schema);
