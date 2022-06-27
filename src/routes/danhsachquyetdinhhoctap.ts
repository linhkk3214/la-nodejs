import { addBaseRoute } from '../base/route-util';
import { DanhSachQuyetDinhHocTapController } from '../controller/danhsachquyetdinhhoctap';
const tableName = 'DanhSachQuyetDinhHocTap';
const controller = new DanhSachQuyetDinhHocTapController();

const router = addBaseRoute(tableName, controller);
// Custom route here
router.post(`/${tableName}/ThayDoiTrangThai/:id/:idTrangThai`, controller.thayDoiTrangThai);
router.post(`/${tableName}/ThongKe/:idNamHoc`, controller.thongKe);

export default router;
