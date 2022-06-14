import { addBaseRoute } from '../base/route-util';
import { DanhSachLoaiQuyetDinhController } from '../controller/danhsachloaiquyetdinh';
const tableName = 'DanhSachLoaiQuyetDinh';
const controller = new DanhSachLoaiQuyetDinhController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
