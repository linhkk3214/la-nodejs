import { addBaseRoute } from '../base/route-util';
import { DanhSachLopHanhChinhController } from '../controller/danhsachlophanhchinh';
const tableName = 'DanhSachLopHanhChinh';
const controller = new DanhSachLopHanhChinhController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
