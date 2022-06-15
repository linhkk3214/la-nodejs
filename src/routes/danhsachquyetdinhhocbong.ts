import { addBaseRoute } from '../base/route-util';
import { DanhSachQuyetDinhHocBongController } from '../controller/danhsachquyetdinhhocbong';
const tableName = 'DanhSachQuyetDinhHocBong';
const controller = new DanhSachQuyetDinhHocBongController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
