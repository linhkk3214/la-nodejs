import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    extension: {
        type: String,
        required: false
    }
});

export default mongoose.model('file', schema);
