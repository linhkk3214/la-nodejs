import { addBaseRoute } from '../base/route-util';
import { DM_TrangThaiNguoiHocController } from '../controller/dm-trangthainguoihoc';
const tableName = 'DM_TrangThaiNguoiHoc';
const controller = new DM_TrangThaiNguoiHocController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
