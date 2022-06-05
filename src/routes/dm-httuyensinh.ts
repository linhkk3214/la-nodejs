import { addBaseRoute } from '../base/route-util';
import { DM_HtTuyenSinhController } from '../controller/dm-httuyensinh';
const tableName = 'DM_HtTuyenSinh';
const controller = new DM_HtTuyenSinhController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
