import { addRoute } from '../utils/route';
import tempModel from '../models/temp-religion';
import model from '../models/religion';
const tableName = 'religion';
const router = await addRoute(tableName);
// Custom route here
router.post(`/${tableName}/Sync`, async (req, res, next) => {
    const lstDataConvert = await tempModel.find({});
    const lstDataInsert = lstDataConvert.map(q => new model({
        soThuTu: q.SoThuTu,
        ten: q.Ten
    }));
    await model.collection.insertMany(lstDataInsert);
    res.json('Sync thành công');
});
export default router;