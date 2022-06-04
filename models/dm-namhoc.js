import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    namHoc: {
        type: String,
        required: true
    },
    nam: {
        type: Number, // Cái này phải cần trường năm dạng số nè, k cần trường namHoc ở trên đâu
        required: true
    },
    tuNgay: {
        type: Date,
        required: true
    },
    denNgay: {
        type: Date,
        required: true
    },
    ghiChu: {
        type: String
    }
});

export default mongoose.model('DM_NamHoc', schema);