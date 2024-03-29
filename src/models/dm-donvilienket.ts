import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDM_DonViLienKet extends IBaseModel {
    ten: String;
    ma: String;
    diaChi: String,
    sdt: String,
    nguoiDaiDien: String,
    chucVu: String,
    soHopDong: String,
    ghiChu: String,
    dsTaiLieu: Array<String>
}

const schema = new Schema<IDM_DonViLienKet>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    ma: { type: String, required: true },
    diaChi: { type: String, required: false },
    sdt: { type: String, required: false },
    nguoiDaiDien: { type: String, required: false },
    soHopDong: { type: String, required: false },
    chucVu: { type: String, required: false },
    ghiChu: { type: String, required: false },
    dsTaiLieu: Array,
});

export default model<IDM_DonViLienKet>('DM_DonViLienKet', schema);
