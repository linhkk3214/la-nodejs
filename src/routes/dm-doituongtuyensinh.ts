import { addBaseRoute } from '../base/route-util';
import { DM_DoiTuongTuyenSinhController } from '../controller/dm-doituongtuyensinh';
const tableName = 'DM_DoiTuongTuyenSinh';
const controller = new DM_DoiTuongTuyenSinhController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
