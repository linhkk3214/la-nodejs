import { addBaseRoute } from '../base/route-util';
import { DM_DoiTuongDaoTaoController } from '../controller/dm-doituongdaotao';
const tableName = 'DM_DoiTuongDaoTao';
const controller = new DM_DoiTuongDaoTaoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
