import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
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
    }
});

export default mongoose.model('User', userSchema);