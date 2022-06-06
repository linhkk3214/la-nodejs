import { addBaseRoute } from '../base/route-util';
import { DM_GioiTinhController } from '../controller/dm-gioitinh';
const tableName = 'DM_GioiTinh';
const controller = new DM_GioiTinhController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
