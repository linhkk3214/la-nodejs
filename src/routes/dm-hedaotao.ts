import { addBaseRoute } from '../base/route-util';
import { DM_HeDaoTaoController } from '../controller/dm-hedaotao';
const tableName = 'DM_HeDaoTao';
const controller = new DM_HeDaoTaoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
