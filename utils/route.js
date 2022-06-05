import express from 'express';
import { baseCrud } from '../services/base';

export async function addRoute(tableName) {
    const [router] = await addRouteCustom(tableName);
    return router;
}

export async function addRouteCustom(tableName) {
    const router = express.Router();
    const tableNamePath = tableName.replace('_', '-');
    const model = await import(`../models/${tableNamePath}.js`);
    const controller = baseCrud(model.default);
    router.post(`/${tableName}`, controller.insert);
    router.get(`/${tableName}/:id`, controller.getDetail);
    router.put(`/${tableName}/:id`, controller.update);
    router.delete(`/${tableName}/:id`, controller.delete);
    router.get(`/${tableName}`, controller.getAll);

    router.post(`/${tableName}/getAllByFilter`, controller.getAllByFilter);
    router.post(`/${tableName}/getData`, controller.getData);
    router.post(`/${tableName}/GetDetailByFilter`, controller.getDetailByFilter);
    return [router, controller, model.default];
}