import { addBaseRoute } from '../base/route-util';
import { DotCapNhatHoSoNguoiHocController } from '../controller/dotcapnhathosonguoihoc';
const tableName = 'DotCapNhatHoSoNguoiHoc';
const controller = new DotCapNhatHoSoNguoiHocController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
