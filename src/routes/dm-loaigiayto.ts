import { addBaseRoute } from '../base/route-util';
import { DM_LoaiGiayToController } from '../controller/dm-loaigiayto';
const tableName = 'DM_LoaiGiayTo';
const controller = new DM_LoaiGiayToController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
