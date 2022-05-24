import express from 'express';
import multer from 'multer';
import { FolderSaveFile } from '../utils/file';
import controller from '../controllers/file';

const router = express.Router();
var upload = multer({ dest: `${FolderSaveFile}/` });
var type = upload.single('file');

router.get('/file/download/:fileName', controller.download)
router.post('/file/upload', type, controller.upload);

export default router;