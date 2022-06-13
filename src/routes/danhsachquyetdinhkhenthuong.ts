import { addBaseRoute } from '../base/route-util';
import { DanhSachQuyetDinhKhenThuongController } from '../controller/danhsachquyetdinhkhenthuong';
const tableName = 'DanhSachQuyetDinhKhenThuong';
const controller = new DanhSachQuyetDinhKhenThuongController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
