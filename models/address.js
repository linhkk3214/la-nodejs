import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    level: {
        type: Number,
        required: true,
    },
    parentId: {
        type: String,
        required: false,
    },
    ten: {
        type: String,
        required: true
    }
});

export default mongoose.model('address', schema);