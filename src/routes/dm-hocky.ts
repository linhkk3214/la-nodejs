import { addBaseRoute } from '../base/route-util';
import { DM_HocKyController } from '../controller/dm-hocky';
const tableName = 'DM_HocKy';
const controller = new DM_HocKyController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
