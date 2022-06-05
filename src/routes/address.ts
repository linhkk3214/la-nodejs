import { addBaseRoute } from '../base/route-util';
import { AddressController } from '../controller/address';
const tableName = 'Address';
const controller = new AddressController();

const router = addBaseRoute(tableName, controller);
// Custom route here
router.post(`/${tableName}/Sync`, controller.SyncFromTemp);
export default router;
