import { addBaseRoute } from '../base/route-util';
import { DotNhapHoc_TpHoSoController } from '../controller/dotnhaphoc-tphoso';
const tableName = 'DotNhapHoc_TpHoSo';
const controller = new DotNhapHoc_TpHoSoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
