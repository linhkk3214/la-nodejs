import { addBaseRoute } from '../base/route-util';
import { DanhSachLoaiKhenThuongController } from '../controller/danhsachloaikhenthuong';
const tableName = 'DanhSachLoaiKhenThuong';
const controller = new DanhSachLoaiKhenThuongController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
