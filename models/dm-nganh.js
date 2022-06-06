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
    idTrinhDoDaoTao: {
        type: String
    },
    maNganhTheoBo: {
        required: true,
        type: String
    },
    tenNganhTA: {
        type: String
    },
});

export default mongoose.model('DM_Nganh', schema);