import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDotCapNhatHoSoNguoiHoc extends IBaseModel {
    ten: String;
    timeTu: Date;
    timeDen: Date;
    ghiChu?: String;
    idHeDaoTao?: Array<String>;
    idKhoaHoc?: Array<String>;
    idKhoaVien?: Array<String>;
    idNganh?: Array<String>;
    idLopHanhChinh?: Array<String>;
    truongDuocSua?: Array<String>;
    idTpHSSH?: Array<String>;
}

const schema = new Schema<IDotCapNhatHoSoNguoiHoc>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    timeTu: { type: Date, required: true },
    timeDen: { type: Date, required: true },
    ghiChu: { type: String, required: false },
    idHeDaoTao: Array,
    idKhoaHoc: Array,
    idKhoaVien: Array,
    idNganh: Array,
    idLopHanhChinh: Array,
    truongDuocSua: Array,
    idTpHSSH: Array,
});

export default model<IDotCapNhatHoSoNguoiHoc>('DotCapNhatHoSoNguoiHoc', schema);
