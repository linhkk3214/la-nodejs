import { addBaseRoute } from '../base/route-util';
import { DanTocController } from '../controller/dantoc';
const tableName = 'DanToc';
const controller = new DanTocController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
