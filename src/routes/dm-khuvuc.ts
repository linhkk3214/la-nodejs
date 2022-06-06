import { addBaseRoute } from '../base/route-util';
import { DM_KhuVucController } from '../controller/dm-khuvuc';
const tableName = 'DM_KhuVuc';
const controller = new DM_KhuVucController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
