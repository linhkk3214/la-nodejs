import { addBaseRoute } from '../base/route-util';
import { DM_ChuongTrinhDaoTaoController } from '../controller/dm-chuongtrinhdaotao';
const tableName = 'DM_ChuongTrinhDaoTao';
const controller = new DM_ChuongTrinhDaoTaoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
