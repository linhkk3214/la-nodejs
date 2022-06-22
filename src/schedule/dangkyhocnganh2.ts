import schedule from 'node-schedule';
import { DefaultIdTrangThaiNguoiHoc } from '../base/const';
import { EnumTrangThaiNganh2 } from '../base/enums';
import DanhSachDangKyHocNganh2 from '../models/danhsachdangkyhocnganh2';
import HoSoNguoiHoc from '../models/hosonguoihoc';
import { IJob } from './iJob';
export default class DangKyHocNganh2Job implements IJob {
    execute() {
        console.log('DangKyHocNganh2Job start every 5 minute');
        schedule.scheduleJob('* */5 * * * *', async () => {
            const lstItemDangKyHocNganh2 = await DanhSachDangKyHocNganh2.find({
                trangThai: EnumTrangThaiNganh2.DA_NHAP_HOC,
                $or: [
                    { synced: null },
                    { synced: false }
                ]

            });
            if (!lstItemDangKyHocNganh2.length) return;
            for (const item of lstItemDangKyHocNganh2) {
                // Cập nhật trạng thái đăng ký học ngành 2 => đã đồng bộ synced = true
                await DanhSachDangKyHocNganh2.updateOne({ _id: item._id }, { $set: { synced: true } });
                // Cập nhật dữ liệu hồ sơ người học
                await HoSoNguoiHoc.updateOne({ _id: item.idNguoiHoc }, {
                    $set: {
                        idNganh2: item.idNganhDangKy,
                        idTrangThaiNganh2: DefaultIdTrangThaiNguoiHoc
                    }
                });
            };
        });
    }
}
