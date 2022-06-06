import { addBaseRoute } from '../base/route-util';
import { DotNhapHocController } from '../controller/dotnhaphoc';
const tableName = 'dotnhaphoc';
const controller = new DotNhapHocController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
