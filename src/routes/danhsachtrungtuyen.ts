import { addBaseRoute } from '../base/route-util';
import { DanhSachTrungTuyenController } from '../controller/danhsachtrungtuyen';
const tableName = 'DanhSachTrungTuyen';
const controller = new DanhSachTrungTuyenController();

const router = addBaseRoute(tableName, controller);
// Custom route here
router.post(`/${tableName}/thongKe`, controller.thongKe);
// End custom route
export default router;
