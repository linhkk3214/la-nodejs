import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IDotCapNhatHoSoNguoiHoc extends IBaseModel {
    ten: String;
    timeTu: Date;
    timeDen: Date;
    ghiChu?: String;
    idHeDaoTaos?: Array<String>;
    idKhoaHocs?: Array<String>;
    idKhoaViens?: Array<String>;
    idNganhs?: Array<String>;
    idLopHanhChinhs?: Array<String>;
    truongDuocSuas?: Array<String>;
    idTpHSSHs?: Array<String>;
}

const schema = new Schema<IDotCapNhatHoSoNguoiHoc>({
    _id: ObjectId,
    created: { type: Date, required: false },
    modified: { type: Date, required: false },
    ten: { type: String, required: true },
    timeTu: { type: Date, required: true },
    timeDen: { type: Date, required: true },
    ghiChu: { type: String, required: false },
    idHeDaoTaos: Array,
    idKhoaHocs: Array,
    idKhoaViens: Array,
    idNganhs: Array,
    idLopHanhChinhs: Array,
    truongDuocSuas: Array,
    idTpHSSHs: Array,
});

export default model<IDotCapNhatHoSoNguoiHoc>('DotCapNhatHoSoNguoiHoc', schema);
