import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    soThuTu: {
        type: Number,
        required: false,
    },
    ten: {
        type: String,
        required: true
    }
});

export default mongoose.model('religion', schema);
