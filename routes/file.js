import { addRoute } from '../utils/route';
import multer from 'multer';
import path from 'path';
import { FolderSaveFile } from '../models/const';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var upload = multer({ dest: `${FolderSaveFile}/temp` });
var type = upload.single('file');
const tableName = 'file';
const router = await addRoute(tableName);
router.get(`/${tableName}/download/:fileName`, (req, res, next) => {
    const arrPath = __dirname.split('\\');
    arrPath.splice(arrPath.length - 1, 1);
    var filePath = path.join(arrPath.join('\\'), FolderSaveFile, req.params.fileName);
    res.download(filePath);
    return;
});
router.post(`/${tableName}/upload`, type, (req, res, next) => {
    res.write(JSON.stringify(req.file));
    res.end();
});
export default router;
