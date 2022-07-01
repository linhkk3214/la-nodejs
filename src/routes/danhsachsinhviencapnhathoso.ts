import { addBaseRoute } from '../base/route-util';
import { DanhSachSinhVienCapNhatHoSoController } from '../controller/danhsachsinhviencapnhathoso';
const tableName = 'DanhSachSinhVienCapNhatHoSo';
const controller = new DanhSachSinhVienCapNhatHoSoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
router.post(`/${tableName}/ThayDoiTrangThai/:id/:idTrangThai`, controller.thayDoiTrangThai);
// End custom route
export default router;
