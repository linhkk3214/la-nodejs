import { addBaseRoute } from '../base/route-util';
import { QuocTichController } from '../controller/quoctich';
const tableName = 'QuocTich';
const controller = new QuocTichController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
