import path from 'path';
import { FolderSaveFile } from '../utils/file';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FileController {
    upload(req, res, next) {
        res.write(JSON.stringify(req.file));
        res.end();
    }
    download(req, res, next) {
        const arrPath = __dirname.split('\\');
        arrPath.splice(arrPath.length - 1, 1);
        var filePath = path.join(arrPath.join('\\'), FolderSaveFile, req.params.fileName);
        res.download(filePath);
        return;
    }
}


export default new FileController();