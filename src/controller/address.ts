import mongoose from 'mongoose';
import { BaseController } from '../base/base-controller';
import Address from '../models/address';
import Temp_Address from '../models/temp-address';

export class AddressController extends BaseController {
    constructor() {
        super(Address);
    }

    SyncFromTemp = async (req, res, next) => {
        const lstAddress = await Temp_Address.find({});
        const lstTinh = [], lstHuyen = [], lstXa = [];
        lstAddress.forEach(item => {
            if (item.level == 1) {
                lstTinh.push(item);
            }
            else if (item.level == 2) {
                lstHuyen.push(item);
            }
            else if (item.level == 3) {
                lstXa.push(item);
            }
        });
        Address.collection.deleteMany({});
        const lstAddressInsert = [];
        const lstTinhInsert = [];
        const lstHuyenInsert = [];
        const lstXaInsert = [];

        lstTinh.forEach(item => {
            const itemInsert = new Address({
                _id: new mongoose.Types.ObjectId(),
                idOld: item.idRoot,
                ten: item.ten,
                level: item.level,
                parentId: null
            });
            lstAddressInsert.push(itemInsert);
            lstTinhInsert.push(itemInsert);
        });

        lstHuyen.forEach(item => {
            const itemTinhInserted = lstTinhInsert.find(q => q.idOld == item.parentId);
            if (!itemTinhInserted) return false;
            const itemInsert = new Address({
                _id: new mongoose.Types.ObjectId(),
                idOld: item.idRoot,
                ten: item.ten,
                level: item.level,
                parentId: itemTinhInserted._id
            });
            lstAddressInsert.push(itemInsert);
            lstHuyenInsert.push(itemInsert);
        });

        lstXa.forEach(item => {
            const itemHuyenInserted = lstHuyenInsert.find(q => q.idOld == item.parentId);
            if (!itemHuyenInserted) return false;
            const itemInsert = new Address({
                _id: new mongoose.Types.ObjectId(),
                idOld: item.idRoot,
                ten: item.ten,
                level: item.level,
                parentId: itemHuyenInserted._id
            });
            lstAddressInsert.push(itemInsert);
            lstXaInsert.push(itemInsert);
        });
        await Address.collection.insertMany(lstAddressInsert);
        console.log(lstAddressInsert.length);
        res.json('Sync thành công');
    };
}
