import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    idLoai: {
        type: String,
        required: false
    },
    idChucVu: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    idTinh: {
        type: String,
        required: true
    },
    idHuyen: {
        type: String,
        required: true
    },
    idXa: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', schema);