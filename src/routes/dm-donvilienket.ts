import { addBaseRoute } from '../base/route-util';
import { DM_DonViLienKetController } from '../controller/dm-donvilienket';
const tableName = 'DM_DonViLienKet';
const controller = new DM_DonViLienKetController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
