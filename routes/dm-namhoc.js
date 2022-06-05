import { addRoute, addRouteCustom } from '../utils/route';
const tableName = 'dm_namhoc';
const [router, controller] = await addRouteCustom(tableName);
// const router1 = await addRoute(tableName);

// Custom route here
// router.post(`${tableName}`, (req, res, next) => {

// });
export default router;