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

// Í tưởng của phần file upload là thế này nhé
// Đoạn để upload file lên backend nodejs thì dùng package multer
// Nó support tự động upload file tải lên từ client vào thư mục mà mình cấu hình (đặt là thư mục X)
// ** Chính là cái dòng bên dưới: var upload = multer....
// Còn cái file upload trên client mình sẽ làm như sau
// upload file từ client lên server như bt
// Server sẽ trả về thông tin file kèm với path của file trong thư mục X (kiểu dạng 46081aaa3619688126d3fbdbd3ffb968)
// Lúc này trên client sẽ đánh dấu là file này chưa được lưu vào database (saved = false)
// Lúc người dùng lưu bản ghi
// Sẽ lưu file vào này cơ sở dữ liệu và upload lại thông tin file vào model đang lưu
// Trường thông tin lưu file sẽ có dạng String hoặc Array tùy vào schema file upload setting multiple hay không
// Ví dụ ở form user sẽ để multiple false, nên kiểu dữ liệu sẽ để là String
// Còn ở form dm-donvilienket sẽ để multiple true, nên kiểu dữ liệu sẽ để là Array
// Dữ liệu của các trường này chính là _id trong bảng files

// Sau khi được dữ liệu thì còn 1 bước hiển thị lại dữ liệu đã lưu trước đó
// Danh sách các Id của file sẽ được truyền vào cho component file-upload
// File-upload sẽ đọc dữ liệu trong bảng files dựa trên các id đó và hiển thị
// ** Và sẽ đánh dấu saved = true để không lưu lại các file đó


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