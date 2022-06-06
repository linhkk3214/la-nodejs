import { addBaseRoute } from '../base/route-util';
import { DM_NamHocController } from '../controller/dm-namhoc';
const tableName = 'DM_NamHoc';
const controller = new DM_NamHocController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
