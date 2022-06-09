import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { registerRootRoute } from './base/route-util';
// #region import route
// import addressRoute from './routes/address';
// import danTocRoute from './routes/dantoc';
// import dmChuongTrinhDaoTaoRoute from './routes/dm-chuongtrinhdaotao';
// import dmCoSoDaoTaoRoute from './routes/dm-cosodaotao';
// import dmDoiTuongDaoTaoRoute from './routes/dm-doituongdaotao';
// import dmDoiTuongTuyenSinhRoute from './routes/dm-doituongtuyensinh';
// import dmDoiTuongUuTienRoute from './routes/dm-doituonguutien';
// import dmDonViLienKetRoute from './routes/dm-donvilienket';
// import dmGioiTinhRoute from './routes/dm-gioitinh';
// import dmHanhKiemRoute from './routes/dm-hanhkiem';
// import dmHeDaoTaoRoute from './routes/dm-hedaotao';
// import dmHocKyRoute from './routes/dm-hocky';
// import dmHocLucRoute from './routes/dm-hocluc';
// import dmHtTuyenSinhRoute from './routes/dm-httuyensinh';
// import dmKhoaHocRoute from './routes/dm-khoahoc';
// import dmKhoaVienRoute from './routes/dm-khoavien';
// import dmKhuVucRoute from './routes/dm-khuvuc';
// import dmLoaiGiayToRoute from './routes/dm-loaigiayto';
// import dmNamHocRoute from './routes/dm-namhoc';
// import dmNganhRoute from './routes/dm-nganh';
// import dmTpHoSoRoute from './routes/dm-tphoso';
// import dmTrangThaiNguoiHocRoute from './routes/dm-trangthainguoihoc';
// import dmTrinhDoDaoTaoRoute from './routes/dm-trinhdodaotao';
// import fileRoute from './routes/file';
// import religionRoute from './routes/religion';
// import userRoute from './routes/user';
// endregion import route

export default async function init() {
    const app = express();
    const port = 3000;
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/', (req, res) => {
        res.json('Server live');
    });

    const options = {
        autoIndex: true,
        useNewUrlParser: true, useUnifiedTopology: true,
    };
    await mongoose.connect(
        'mongodb://localhost:27017/quanlynguoihoc', options,
    ).then(() => {
        console.log('Database connected');
    }).catch((error) => {
        console.log('Error connecting to database');
    });

    // region Register route
    await registerRootRoute(app);
    // app.use('/', addressRoute);
    // app.use('/', danTocRoute);
    // app.use('/', dmChuongTrinhDaoTaoRoute);
    // app.use('/', dmCoSoDaoTaoRoute);
    // app.use('/', dmDoiTuongDaoTaoRoute);
    // app.use('/', dmDoiTuongTuyenSinhRoute);
    // app.use('/', dmDoiTuongUuTienRoute);
    // app.use('/', dmDonViLienKetRoute);
    // app.use('/', dmGioiTinhRoute);
    // app.use('/', dmHanhKiemRoute);
    // app.use('/', dmHeDaoTaoRoute);
    // app.use('/', dmHocKyRoute);
    // app.use('/', dmHocLucRoute);
    // app.use('/', dmHtTuyenSinhRoute);
    // app.use('/', dmKhoaHocRoute);
    // app.use('/', dmKhoaVienRoute);
    // app.use('/', dmKhuVucRoute);
    // app.use('/', dmLoaiGiayToRoute);
    // app.use('/', dmNamHocRoute);
    // app.use('/', dmNganhRoute);
    // app.use('/', dmTpHoSoRoute);
    // app.use('/', dmTrangThaiNguoiHocRoute);
    // app.use('/', dmTrinhDoDaoTaoRoute);
    // app.use('/', fileRoute);
    // app.use('/', religionRoute);
    // app.use('/', userRoute);
    // #endregion

    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
}
