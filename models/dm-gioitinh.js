import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    moTa: {
        type: String,
        required: false
    }
});

export default mongoose.model('DM_GioiTinh', schema);