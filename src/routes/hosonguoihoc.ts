import { addBaseRoute } from '../base/route-util';
import { HoSoNguoiHocController } from '../controller/hosonguoihoc';
const tableName = 'HoSoNguoiHoc';
const controller = new HoSoNguoiHocController();

const router = addBaseRoute(tableName, controller);
// Custom route here
router.post(`/${tableName}/thongKe`, controller.thongKeNguoiHocTheoNganh);
router.post(`/${tableName}/thongKeTheoKhoa`, controller.thongKeNguoiHocTheoKhoa);
// End custom route
export default router;
