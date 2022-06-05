import { addBaseRoute } from '../base/route-util';
import { UserController } from '../controller/user';
const tableName = 'User';
const controller = new UserController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
