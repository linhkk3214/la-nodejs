import { addBaseRoute } from '../base/route-util';
import { DM_CoSoDaoTaoController } from '../controller/dm-cosodaotao';
const tableName = 'DM_CoSoDaoTao';
const controller = new DM_CoSoDaoTaoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
