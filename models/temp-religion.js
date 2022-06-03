import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    SoThuTu: {
        type: Number,
        required: false,
    },
    Ten: {
        type: String,
        required: true
    }
});

export default mongoose.model('temp_religion', schema);
