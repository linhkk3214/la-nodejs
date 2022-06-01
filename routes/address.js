import { addRoute } from '../utils/route';
import tempAddress from '../models/temp-address';
import address from '../models/address';
import mongodb from 'mongodb';
const tableName = 'address';
const router = await addRoute(tableName);
const ObjectID = mongodb.ObjectId;
// Custom route here
router.post(`/${tableName}/Sync`, async (req, res, next) => {
    const lstAddress = await tempAddress.find({});
    const lstTinh = [], lstHuyen = [], lstXa = [];
    lstAddress.forEach(item => {
        if (item.Level == 1) {
            lstTinh.push(item);
        }
        else if (item.Level == 2) {
            lstHuyen.push(item);
        }
        else if (item.Level == 3) {
            lstXa.push(item);
        }
    });
    address.collection.deleteMany({});
    const lstAddressInsert = [];
    const lstTinhInsert = [];
    const lstHuyenInsert = [];
    const lstXaInsert = [];

    lstTinh.forEach(item => {
        const itemInsert = new address({
            _id: new ObjectID(),
            idOld: item.IdRoot,
            ten: item.Ten,
            level: item.Level,
            parentId: null
        });
        lstAddressInsert.push(itemInsert);
        lstTinhInsert.push(itemInsert);
    });
    
    lstHuyen.forEach(item => {
        const itemTinhInserted = lstTinhInsert.find(q => q.idOld == item.ParentId);
        if (!itemTinhInserted) return false;
        const itemInsert = new address({
            _id: new ObjectID(),
            idOld: item.IdRoot,
            ten: item.Ten,
            level: item.Level,
            parentId: itemTinhInserted._id
        });
        lstAddressInsert.push(itemInsert);
        lstHuyenInsert.push(itemInsert);
    });
    
    lstXa.forEach(item => {
        const itemHuyenInserted = lstHuyenInsert.find(q => q.idOld == item.ParentId);
        if (!itemHuyenInserted) return false;
        const itemInsert = new address({
            _id: new ObjectID(),
            idOld: item.IdRoot,
            ten: item.Ten,
            level: item.Level,
            parentId: itemHuyenInserted._id
        });
        lstAddressInsert.push(itemInsert);
        lstXaInsert.push(itemInsert);
    });
    await address.collection.insertMany(lstAddressInsert);
    console.log(lstAddressInsert.length);
    res.json('Sync thành công');
});
export default router;