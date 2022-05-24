export function addRoute(router, tableName, baseController) {
    router.post(`/${tableName}`, baseController.insert);
    router.get(`/${tableName}/:id`, baseController.getDetail);
    router.put(`/${tableName}/:id`, baseController.update);
    router.delete(`/${tableName}/:id`, baseController.delete);
    router.get(`/${tableName}`, baseController.getAll);
    router.post(`/${tableName}/getAllByFilter`, baseController.getAllByFilter);
    router.post(`/${tableName}/getData`, baseController.getData);
}
