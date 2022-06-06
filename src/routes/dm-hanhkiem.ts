import { addBaseRoute } from '../base/route-util';
import { DM_HanhKiemController } from '../controller/dm-hanhkiem';
const tableName = 'DM_HanhKiem';
const controller = new DM_HanhKiemController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
