import { BaseController } from '../base/base-controller';
import File from '../models/file';
import mongoose from 'mongoose';
import path from 'path';
import { FolderSaveFile } from '../base/const';
import fs from 'fs';
const arrPath = __dirname.split('\\');
arrPath.splice(arrPath.length - 2, 2);
const currentDirectory = arrPath.join('/');

export class FileController extends BaseController {
    constructor() {
        super(File);
    }

    saveFile = async (req, res, next) => {
        const files = req.body;
        if (!files || !files.length) {
            return res.json({
                success: true
            });
        }
        const lstFileNotYetSave = [];
        const lstFileReturn = [];
        files.forEach(item => {
            item._id = new mongoose.Types.ObjectId();
            const lstInfo = [];
            const indexDot = item.originalname.lastIndexOf('.');
            if (indexDot == -1) {
                lstInfo.push(item.originalname, null);
            }
            else {
                lstInfo.push(
                    item.originalname.substring(0, indexDot),
                    item.originalname.substring(indexDot + 1).toLowerCase()
                );
            }
            const indexSplash = item.path.lastIndexOf('\\');
            const key = item.path.substring(indexSplash + 1);
            const filePathSource = this.getFullPathUpload([item.path]);
            const filePathDest = this.getFullPathUpload([FolderSaveFile, key]);
            fs.copyFileSync(filePathSource, filePathDest);
            fs.unlinkSync(filePathSource);
            const modelReturn = {
                _id: item._id,
                url: key,
                name: lstInfo[0],
                extension: lstInfo[1],
                tempId: item.tempId
            };
            lstFileNotYetSave.push(new File(modelReturn));
            lstFileReturn.push(modelReturn);
        });
        if (lstFileNotYetSave) {
            await File.collection.insertMany(lstFileNotYetSave);
        }
        return res.json({
            success: true,
            data: lstFileReturn
        });
    };

    download = (req, res, next) => {
        const filePath = this.getFullPathUpload([FolderSaveFile, req.params.fileName]);
        res.download(filePath);
        return;
    };

    upload = (req, res, next) => {
        res.write(JSON.stringify(req.file));
        res.end();
    };

    private getFullPathUpload(arrPathPlus) {
        return path.join(currentDirectory, arrPathPlus.join('\\'));
    }
}
