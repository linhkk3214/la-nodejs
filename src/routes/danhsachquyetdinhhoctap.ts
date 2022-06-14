import { addBaseRoute } from '../base/route-util';
import { DanhSachQuyetDinhHocTapController } from '../controller/danhsachquyetdinhhoctap';
const tableName = 'DanhSachQuyetDinhHocTap';
const controller = new DanhSachQuyetDinhHocTapController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
