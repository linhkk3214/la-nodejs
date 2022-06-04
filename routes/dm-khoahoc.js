import { addRoute } from '../utils/route';
const tableName = 'dm_khoahoc';
const router = await addRoute(tableName);
// Custom route here
// router.post(`${tableName}`, (req, res, next) => {

// });
export default router;