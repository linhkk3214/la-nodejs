import { addBaseRoute } from '../base/route-util';
import { DM_KhoaVienController } from '../controller/dm-khoavien';
const tableName = 'DM_KhoaVien';
const controller = new DM_KhoaVienController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;

// Model => controller => route 