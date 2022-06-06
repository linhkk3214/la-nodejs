import { addBaseRoute } from '../base/route-util';
import { DM_DoiTuongUuTienController } from '../controller/dm-doituonguutien';
const tableName = 'DM_DoiTuongUuTien';
const controller = new DM_DoiTuongUuTienController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
