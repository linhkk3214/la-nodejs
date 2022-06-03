import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ma: {
        type: String,
        required: true, //cái required này không cần khai báo cũng được đúng hem ạ vì ở bên angular anh đã code rùi có cái 
    },
    ten: {
        type: String,
        required: true,
    },
    diaChi: {
        type: String,
        required: true,
    },
    ghiChu: {
        type: String,
    },
});

export default mongoose.model('DM_CoSoDaoTao', schema);

