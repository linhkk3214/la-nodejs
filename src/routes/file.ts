import multer from 'multer';
import { FolderSaveFile } from '../base/const';
import { addBaseRoute } from '../base/route-util';
import { FileController } from '../controller/file';
const tableName = 'File';
const controller = new FileController();
const router = addBaseRoute(tableName, controller);

const upload = multer({ dest: `${FolderSaveFile}/temp` });
const type = upload.single('file');

router.post(`/${tableName}/savefiles`, controller.saveFile);
router.get(`/${tableName}/download/:fileName`, controller.download);
router.get(`/${tableName}/download/temp/:fileName`, controller.downloadFromTemp);
router.post(`/${tableName}/upload`, type, controller.upload);
export default router;

