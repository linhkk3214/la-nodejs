import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

<<<<<<<< HEAD:models/dm-httuyensinh.js
const htTuyenSinhSchema = new mongoose.Schema({
========
const schema = new mongoose.Schema({
>>>>>>>> 10445107a1bc0751affb5c25ba92c159925ad635:models/temp-address.js
    _id: mongoose.Schema.Types.ObjectId,
    Level: {
        type: Number,
        required: true,
    },
    IdRoot: {
        type: String,
        required: true,
    },
<<<<<<<< HEAD:models/dm-httuyensinh.js
    ma: {
        type: String,
        required: true,
    }
});

export default mongoose.model('DM_HtTuyenSinh', htTuyenSinhSchema);
========
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
>>>>>>>> 10445107a1bc0751affb5c25ba92c159925ad635:models/temp-address.js
