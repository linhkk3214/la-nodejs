import { addBaseRoute } from '../base/route-util';
import { DanhMucDonViTaiTroController } from '../controller/danhmucdonvitaitro';
const tableName = 'DanhMucDonViTaiTro';
const controller = new DanhMucDonViTaiTroController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
