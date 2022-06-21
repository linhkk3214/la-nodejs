import { addBaseRoute } from '../base/route-util';
import { DanhSachDangKyHocNganh2Controller } from '../controller/danhsachdangkyhocnganh2';
const tableName = 'DanhSachDangKyHocNganh2';
const controller = new DanhSachDangKyHocNganh2Controller();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
