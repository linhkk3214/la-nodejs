import { addBaseRoute } from '../base/route-util';
import { DanhSachDangKyHocNganh2Controller } from '../controller/danhsachdangkyhocnganh2';
const tableName = 'DanhSachDangKyHocNganh2';
const controller = new DanhSachDangKyHocNganh2Controller();

const router = addBaseRoute(tableName, controller);
// Custom route here
router.post(`/${tableName}/ThayDoiTrangThai/:id/:trangThai`, controller.thayDoiTrangThai);
router.post(`/${tableName}/thongKeTheoDonVi2`, controller.thongKeTheoDonVi2);
router.post(`/${tableName}/thongKeTheoDonVi1`, controller.thongKeTheoDonVi1);
// End custom route
export default router;
