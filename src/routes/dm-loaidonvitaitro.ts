import { addBaseRoute } from '../base/route-util';
import { DM_LoaiDonViTaiTroController } from '../controller/dm-loaidonvitaitro';
const tableName = 'DM_LoaiDonViTaiTro';
const controller = new DM_LoaiDonViTaiTroController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
