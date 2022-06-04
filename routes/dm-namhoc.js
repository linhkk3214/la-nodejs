import { addRoute } from '../utils/route';
import model from '../models/dm-namhoc';
const tableName = 'dm_namhoc';
const router = await addRoute(tableName, controller => {
    controller.update = (req, res, next) => {
        const jsonUpdate = { ...req.body };
        jsonUpdate.namHoc = `${jsonUpdate.nam} - ${jsonUpdate.nam + 1}`;
        model.updateOne({ _id: req.params.id }, { $set: jsonUpdate })
            .then((newUser) => {
                return res.status(200).json({
                    success: true,
                    data: newUser,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Có lỗi xảy ra',
                    error: error.message,
                });
            });
    }
});
// Custom route here
// router.post(`${tableName}`, (req, res, next) => {

// });
export default router;