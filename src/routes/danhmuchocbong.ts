import { addBaseRoute } from '../base/route-util';
import { DanhMucHocBongController } from '../controller/danhmuchocbong';
const tableName = 'DanhMucHocBong';
const controller = new DanhMucHocBongController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
