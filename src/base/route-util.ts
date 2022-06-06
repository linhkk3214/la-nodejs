import express, { Router } from 'express';
import fs from 'fs';
import glob from 'glob';
import { BaseController } from './base-controller';
import { ColorReference } from './const';
const arrPath = __dirname.split('\\');
arrPath.splice(arrPath.length - 1, 1);
const currentDirectory = arrPath.join('/');
export async function registerRootRoute(app: any) {
    fs.readdir('./src/routes', (err, files) => {
        if (err) {
            throw err;
        }

        files.forEach(async file => {
            if (!file.endsWith('.ts')) return;
            const routeModule = await import(`${currentDirectory}/routes/${file}`);
            console.info(ColorReference.FgGreen, `Register route /routes/${file}`, ColorReference.Reset);
            app.use('/', routeModule.default);
        });
    });

    // await glob.sync('./src/routes/*.ts').forEach(async (file) => {
    //     console.log(`xxx_${file}`);
    // });
}

export function addBaseRoute(tableName: string, controller: BaseController): Router {
    const router = express.Router();
    router.post(`/${tableName}`, controller.insert);
    router.get(`/${tableName}/:id`, controller.getDetail);
    router.put(`/${tableName}/:id`, controller.update);
    router.delete(`/${tableName}/:id`, controller.delete);
    router.get(`/${tableName}`, controller.getAll);

    router.post(`/${tableName}/getAllByFilter`, controller.getAllByFilter);
    router.post(`/${tableName}/getData`, controller.getData);
    router.post(`/${tableName}/GetDetailByFilter`, controller.getDetailByFilter);

    return router;
}
