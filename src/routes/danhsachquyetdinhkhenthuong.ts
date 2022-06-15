import { addBaseRoute } from '../base/route-util';
import { DanhSachQuyetDinhKhenThuongController } from '../controller/danhsachquyetdinhkhenthuong';
const tableName = 'DanhSachQuyetDinhKhenThuong';
const controller = new DanhSachQuyetDinhKhenThuongController();

const router = addBaseRoute(tableName, controller);
// Custom route here
router.post(`/${tableName}/ThongKe`, controller.thongKe);
// End custom route
export default router;
