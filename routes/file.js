import { addRoute } from '../utils/route';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongodb from 'mongodb';
import fileModel from '../models/file';
import { FolderSaveFile } from '../models/const';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const arrPath = __dirname.split('\\');
arrPath.splice(arrPath.length - 1, 1);
const ObjectID = mongodb.ObjectId;

var upload = multer({ dest: `${FolderSaveFile}/temp` });
var type = upload.single('file');
const tableName = 'file';
const router = await addRoute(tableName);
router.post(`/${tableName}/savefiles`, async (req, res, next) => {
    const files = req.body;
    if (!files || !files.length) return res.json({
        success: true
    });
    const lstFileNotYetSave = [];
    const lstFileReturn = [];
    files.forEach(item => {
        item._id = new ObjectID();
        const lstInfo = [];
        const indexDot = item.originalname.lastIndexOf('.');
        if (indexDot == -1) {
            lstInfo.push(item.originalname, null);
        }
        else {
            lstInfo.push(
                item.originalname.substring(0, indexDot),
                item.originalname.substring(indexDot + 1).toLowerCase()
            )
        }
        const indexSplash = item.path.lastIndexOf('\\');
        const key = item.path.substring(indexSplash + 1);
        const filePathSource = getFullPathUpload([item.path]);
        const filePathDest = getFullPathUpload([FolderSaveFile, key]);
        fs.copyFileSync(filePathSource, filePathDest);
        fs.unlinkSync(filePathSource);
        const modelReturn = {
            _id: item._id,
            url: key,
            name: lstInfo[0],
            extension: lstInfo[1],
            tempId: item.tempId
        };
        lstFileNotYetSave.push(new fileModel(modelReturn));
        lstFileReturn.push(modelReturn);
    });
    if (lstFileNotYetSave) {
        await fileModel.collection.insertMany(lstFileNotYetSave);
    }
    return res.json({
        success: true,
        data: lstFileReturn
    });
});
router.get(`/${tableName}/download/:fileName`, (req, res, next) => {
    const filePath = getFullPathUpload([FolderSaveFile, req.params.fileName]);
    res.download(filePath);
    return;
});
router.post(`/${tableName}/upload`, type, (req, res, next) => {
    res.write(JSON.stringify(req.file));
    res.end();
});
export default router;

function getFullPathUpload(arrPathPlus) {
    return path.join(arrPath.join('\\'), arrPathPlus.join('\\'));
}