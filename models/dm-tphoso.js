import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const tpHoSoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: {
        type: String
    },
    ma: {
        type: String
    },
    tenKhiNopOnline: {
        type: String
    },
    soLuongBanChinh: {
        type: Number
    },
    soLuongBanSao: {
        type: Number
    },
    soLuongBanCC: {
        type: Number
    },
    ghiChu: {
        type: String
    },
    thuocDoiTuongUuTien: {
        type: String
    },
    thuocNghiaVuQuanSu: {
        type: String
    },
    idLoaiGiayTo: {
        type: String,
        required: false
    }
});

export default mongoose.model('DM_TpHoSo', tpHoSoSchema);