import { addBaseRoute } from '../base/route-util';
import { HoSoCanBoController } from '../controller/hosocanbo';
const tableName = 'HoSoCanBo';
const controller = new HoSoCanBoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
