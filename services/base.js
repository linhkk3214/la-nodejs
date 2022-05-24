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
            const filters = getFilterFromBody(req.body);
            type.find(filters)
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
            const filters = getFilterFromBody(req.body.filters);
            let skip = 0, limit = 15;
            if (req.body.pageInfo) {
                skip = ((req.body.pageInfo.page - 1) * req.body.pageInfo.pageSize);
                limit = req.body.pageInfo.pageSize;
            }
            Promise.all([
                type.count(filters),
                type.find(filters, 'age username ten', { skip, limit })
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
        }
    }
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

function getFilterFromBody2(filterFromBody) {
    const filters = {};
    if (filterFromBody) {
        filters['$and'] = [];
        filterFromBody.forEach(item => {
            getFilterItem2(filters['$and'], item);
        });
    }
    return filters;
}

function getFilterItem2(filters, item) {
    if (item.logic) {
        const childFilter = { [item.logic]: getFilterFromBody2(item.filters) };
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