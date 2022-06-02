import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const htTuyenSinhSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: {
        type: String,
        required: true,
    },
    ma: {
        type: String,
        required: true,
    }
});

export default mongoose.model('DM_HtTuyenSinh', htTuyenSinhSchema);