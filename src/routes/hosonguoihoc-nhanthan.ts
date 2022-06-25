import { addBaseRoute } from '../base/route-util';
import { HoSoNguoiHoc_NhanThanController } from '../controller/hosonguoihoc-nhanthan';
const tableName = 'HoSoNguoiHoc_NhanThan';
const controller = new HoSoNguoiHoc_NhanThanController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
