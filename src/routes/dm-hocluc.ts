import { addBaseRoute } from '../base/route-util';
import { DM_HocLucController } from '../controller/dm-hocluc';
const tableName = 'DM_HocLuc';
const controller = new DM_HocLucController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
