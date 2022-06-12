import { addBaseRoute } from '../base/route-util';
import { DanhSachQuyetDinhChuyenNganhController } from '../controller/danhsachquyetdinhchuyennganh';
const tableName = 'DanhSachQuyetDinhChuyenNganh';
const controller = new DanhSachQuyetDinhChuyenNganhController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
