import { addBaseRoute } from '../base/route-util';
import { DM_KhoaHocController } from '../controller/dm-khoahoc';
const tableName = 'DM_KhoaHoc';
const controller = new DM_KhoaHocController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
