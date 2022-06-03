import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: {
        type: String,
        required: true
    },
    ma: {
        type: String,
        required: true
    },
    tenTiengAnh: {
        type: String
    }
});

export default mongoose.model('DM_HeDaoTao', schema);