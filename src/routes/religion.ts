import { addBaseRoute } from '../base/route-util';
import { ReligionController } from '../controller/religion';
const tableName = 'Religion';
const controller = new ReligionController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
