import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Level: {
        type: Number,
        required: true,
    },
    IdRoot: {
        type: String,
        required: true,
    },
    ParentId: {
        type: String,
        required: false
    },
    Ten: {
        type: String,
        required: true
    }
});

export default mongoose.model('temp_address', schema);