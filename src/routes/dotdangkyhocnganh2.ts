import { addBaseRoute } from '../base/route-util';
import { DotDangKyHocNganh2Controller } from '../controller/dotdangkyhocnganh2';
const tableName = 'DotDangKyHocNganh2';
const controller = new DotDangKyHocNganh2Controller();

const router = addBaseRoute(tableName, controller);
// Custom route here
// End custom route
export default router;
