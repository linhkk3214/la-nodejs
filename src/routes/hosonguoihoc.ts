import { addBaseRoute } from '../base/route-util';
import { HoSoNguoiHocController } from '../controller/hosonguoihoc';
const tableName = 'HoSoNguoiHoc';
const controller = new HoSoNguoiHocController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
