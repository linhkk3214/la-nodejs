import { addBaseRoute } from '../base/route-util';
import { DM_TpHoSoController } from '../controller/dm-tphoso';
const tableName = 'DM_TpHoSo';
const controller = new DM_TpHoSoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
