import { addBaseRoute } from '../base/route-util';
import { DM_TrinhDoDaoTaoController } from '../controller/dm-trinhdodaotao';
const tableName = 'DM_TrinhDoDaoTao';
const controller = new DM_TrinhDoDaoTaoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
