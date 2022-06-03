import mongoose from 'mongoose';
export function baseCrud(type) {
    return {
        insert: function (req, res) {
            const user = new type({
                _id: mongoose.Types.ObjectId(),
                ...req.body
            });
            return user
                .save()
                .then((newUser) => {
                    return res.status(200).json({
                        success: true,
                        data: newUser,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Có lỗi xảy ra',
                        error: error.message,
                    });
                });
        },
        getDetail: function (req, res) {
            return type
                .findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
                .then((itemUser) => {
                    return res.status(200).json({
                        success: true,
                        data: itemUser,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Có lỗi xảy ra khi get detail',
                        error: error.message,
                    });
                });
        },
        update: function (req, res) {
            type.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
                .then((newUser) => {
                    return res.status(200).json({
                        success: true,
                        data: newUser,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Có lỗi xảy ra',
                        error: error.message,
                    });
                });
        },
        delete: function (req, res) {
            type.deleteOne({ _id: req.params.id })
                .then((newUser) => {
                    return res.status(200).json({
                        success: true,
                        data: newUser,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Có lỗi xảy ra',
                        error: error.message,
                    });
                });
        },
        getAll: function (req, res) {
            type.find()
                .then((allData) => {
                    return res.status(200).json({
                        success: true,
                        message: 'all item',
                        data: allData,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: 'Có lỗi xảy ra',
                        error: err.message,
                    });
                });
        },
        getAllByFilter: function (req, res) {
            const query = createQueryFromBody(type, req.body);
            query
                .then((lstData) => {
                    return res.status(200).json({
                        success: true,
                        data: lstData,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: 'Có lỗi xảy ra',
                        error: err.message,
                    });
                });
        },
        getData: function async(req, res) {
            const [query, filters] = createQueryWithFilterFromBody(type, req.body);
            Promise.all([
                type.count(filters),
                query
            ]).then(([totalRecord, allUser]) => {
                return res.status(200).json({
                    success: true,
                    data: allUser,
                    totalRecord: totalRecord
                });
            }).catch((err) => {
                res.status(500).json({
                    success: false,
                    message: 'Có lỗi',
                    error: err.message,
                });
            });
        },
        getDetailByFilter: function (req, res) {
            const filters = getFilterFromBody(req.body.filters);
            return type
                .findOne(filters)
                .then((itemUser) => {
                    return res.status(200).json({
                        success: true,
                        data: itemUser,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Có lỗi xảy ra khi get detail',
                        error: error.message,
                    });
                });
        },
    }
}

function createQueryFromBody(type, body) {
    const [query] = createQueryWithFilterFromBody(type, body);
    return query;
}

function createQueryWithFilterFromBody(type, body) {
    let filters = {};
    if (body.filters) {
        filters = getFilterFromBody(body.filters);
    }
    let query = type.find(filters);
    if (body.sorts && body.sorts.length) {
        const sorts = {};
        body.sorts.forEach(sort => {
            sorts[sort.field] = sort.dir ? sort.dir : 1
        });
        query = query.sort(sorts);
    }
    if (body.pageInfo) {
        const skip = ((body.pageInfo.page - 1) * body.pageInfo.pageSize);
        const limit = body.pageInfo.pageSize;
        query = query.skip(skip).limit(limit);
    }
    return [query, filters];
}

function getFilterFromBody(filterFromBody, logic = 'and') {
    const filters = {};
    if (filterFromBody) {
        const keyLogic = `$${logic}`;
        filters[keyLogic] = [];
        filterFromBody.forEach(item => {
            getFilterItem(filters[keyLogic], item);
        });
        if (filters[keyLogic].length == 0) return {};
        if (filters[keyLogic].length == 1)
            return filters[keyLogic][0];
    }
    return filters;
}

function getFilterItem(filters, item) {
    if (item.logic) {
        const childFilter = getFilterFromBody(item.filters, item.logic);
        filters.push(childFilter);
    }
    else {
        if (item.operator == 'in') {
            filters.push({
                [item.field]: { "$in": JSON.parse(item.value) }
            });
        }
        else if (item.operator == 'contains') {
            filters.push({
                [item.field]: {
                    "$regex": `${JSON.parse(item.value)}`,
                    "$options": "i"
                }
            });
        }
        else if (item.operator == 'gt' || item.operator == 'gte'
            || item.operator == 'lt' || item.operator == 'lte') {
            filters.push({
                [item.field]: {
                    [`$${item.operator}`]: `${JSON.parse(item.value)}`,
                }
            });
        }
        else {
            filters.push({
                [item.field]: `${JSON.parse(item.value)}`
            });
        }
    }
}

function saveFile(model, field) {
    const lstFile = model[field];
    if (!lstFile || !lstFile.length) return;
    const lstFileNotYetSave = [];
    lstFile.forEach(item => {
        if (!item._id) {
            // lstFileNotYetSave.ou
        }
    });
}