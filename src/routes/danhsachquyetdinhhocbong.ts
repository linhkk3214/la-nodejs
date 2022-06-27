import { addBaseRoute } from '../base/route-util';
import { DanhSachQuyetDinhHocBongController } from '../controller/danhsachquyetdinhhocbong';
const tableName = 'DanhSachQuyetDinhHocBong';
const controller = new DanhSachQuyetDinhHocBongController();

const router = addBaseRoute(tableName, controller);
// Custom route here
router.post(`/${tableName}/ThayDoiTrangThai/:id/:idTrangThai`, controller.thayDoiTrangThai);
router.post(`/${tableName}/ThongKe/:idNamHoc`, controller.thongKe);
// End custom route
export default router;
