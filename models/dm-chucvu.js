import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const chucVuSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: {
        type: String,
        required: true,
    },
    ma: {
        type: String,
        required: true,
    },
    idLoaiNguoiDung: {
        type: String,
        required: false
    }
});

export default mongoose.model('DM_ChucVu', chucVuSchema);