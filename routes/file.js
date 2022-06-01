import express from 'express';
import multer from 'multer';
import { FolderSaveFile } from '../utils/file';

const router = express.Router();
var upload = multer({ dest: `${FolderSaveFile}/` });
var type = upload.single('file');

router.get('/file/download/:fileName', function (req, res, next) {
    const arrPath = __dirname.split('\\');
    arrPath.splice(arrPath.length - 1, 1);
    var filePath = path.join(arrPath.join('\\'), FolderSaveFile, req.params.fileName);
    res.download(filePath);
    return;
});
router.post('/file/upload', type, function (req, res, next) {
    res.write(JSON.stringify(req.file));
    res.end();
});

export default router;
