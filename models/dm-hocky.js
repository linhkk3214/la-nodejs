import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idNamHoc: {
        type: String,
        required: true
    },
    hocKy: {
        type: String,
        required: true
    },
    tenHocKy: {
        type: String,
        required: true
    },
    tenRutGon: {
        type: String
    },
    tuNgay: {
        type: Date,
        required: true
    },
    denNgay: {
        type: Date,
        required: true
    },
    loaiHocKy: {
        type: Number,
        required: true
    }
});

export default mongoose.model('DM_HocKy', schema);