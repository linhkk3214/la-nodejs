import { addBaseRoute } from '../base/route-util';
import { DotNhapHoc_HoSoController } from '../controller/dotnhaphoc-hoso';
const tableName = 'DotNhapHoc_HoSo';
const controller = new DotNhapHoc_HoSoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
