import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { IBaseModel } from './base-model';

export interface IHoSoNguoiHoc extends IBaseModel {
    masv: String,
    Ho: String,
    Ten: String,
    hoVaTen: String,
    GioiTinh: String,
    idDanToc: String,
    idTonGiao: String,
    idQuocTich: String,
    CmndSo: String,
    CmndNgayCap: Date,
    CmndNoiCap: String,
    Anh: String,
    NhapHocNamHoc: String,
    NoiTru: String,
    idTinhqq: String,
    idHuyenqq: String,
    idXaqq: String,
    idTinhtt: String,
    idHuyentt: String,
    idXatt: String,
    idTinhhn: String,
    idHuyenhn: String,
    idXahn: String,
    DienThoai: String,
    Email: String,
    idLopHanhChinh: String,
    idHe: String,
    idKhoa: String,
    idKhoaHoc: String,
    idNganh: String,
    idTrangThai: String,
    idLopHienTai: String,
    idKhoaVien: String,
    moiQuanHe: String,
    tenNhanThan: String,
    ngaySinhNhanThan: String,
    ngheNghiepNhanThan: String,
    noiONhanThan: String,
    sdtNhanThan: String,
    NgaySinh: Date,
    idDoiTuongDaoTao: String,
    NgayQuyetDinhThoiHoc: Date,
}

const schema = new Schema<IHoSoNguoiHoc>({
    _id: ObjectId,
    masv: { type: String, required: true },
    Ho: { type: String, required: true },
    Ten: { type: String, required: true },
    hoVaTen: { type: String, required: false },
    GioiTinh: { type: String, required: false },
    idDanToc: { type: String, required: false },
    idTonGiao: { type: String, required: false },
    idQuocTich: { type: String, required: false },
    CmndSo: { type: String, required: false },
    CmndNgayCap: { type: Date, required: false },
    CmndNoiCap: { type: String, required: false },
    Anh: { type: String, required: false },
    NhapHocNamHoc: { type: String, required: false },
    NoiTru: { type: String, required: false },
    idTinhqq: { type: String, required: false },
    idHuyenqq: { type: String, required: false },
    idXaqq: { type: String, required: false },
    idTinhtt: { type: String, required: false },
    idHuyentt: { type: String, required: false },
    idXatt: { type: String, required: false },
    idTinhhn: { type: String, required: false },
    idHuyenhn: { type: String, required: false },
    idXahn: { type: String, required: false },
    DienThoai: { type: String, required: false },
    Email: { type: String, required: false },
    idLopHanhChinh: { type: String, required: true },
    idHe: { type: String, required: true },
    idKhoa: { type: String, required: true },
    idKhoaHoc: { type: String, required: true },
    idNganh: { type: String, required: true },
    idTrangThai: { type: String, required: true },
    idLopHienTai: { type: String, required: false },
    idKhoaVien: { type: String, required: false },
    sdtNhanThan: { type: String, required: false },
    ngheNghiepNhanThan: { type: String, required: false },
    ngaySinhNhanThan: { type: String, required: false },
    tenNhanThan: { type: String, required: false },
    moiQuanHe: { type: String, required: false },
    noiONhanThan: { type: String, required: false },
    NgaySinh: { type: Date, required: true },
    idDoiTuongDaoTao: { type: String, required: false },
    NgayQuyetDinhThoiHoc: { type: Date, required: false },
});

export default model<IHoSoNguoiHoc>('HoSoNguoiHoc', schema);
