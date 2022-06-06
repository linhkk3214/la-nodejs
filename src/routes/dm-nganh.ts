import { addBaseRoute } from '../base/route-util';
import { DM_NganhController } from '../controller/dm-nganh';
const tableName = 'DM_Nganh';
const controller = new DM_NganhController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
