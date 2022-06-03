import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: {
        type: String
    },
    ma: {
        type: String
    },
    diaChi: {
        type: String
    },
    sdt: {
        type: String
    },
    nguoiDaiDien: {
        type: String
    },
    chucVu: {
        type: String
    },
    soHopDong: {
        type: String
    },
    ghiChu: {
        type: String
    },
    dsTaiLieu: {
        type: String,
        required: false
    }
});

export default mongoose.model('DM_DonViLienKet', schema);