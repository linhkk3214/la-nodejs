import { addBaseRoute } from '../base/route-util';
import { ThongBaoController } from '../controller/thongbao';
const tableName = 'ThongBao';
const controller = new ThongBaoController();

const router = addBaseRoute(tableName, controller);
// Custom route here
// router.get(`/${tableName}`, controller.xxx);
// End custom route
export default router;
