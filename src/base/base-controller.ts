import { Response } from 'express';
import mongoose, { Model } from 'mongoose';

export class BaseController {
    constructor(public ModelType: Model<any>) {
    }

    insert = async (req, res: Response) => {
        const user = new this.ModelType({
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
        });

        await this.beforeSave(user);
        return user
            .save()
            .then(async (newUser) => {
                await this.afterInsert(user, req.body);
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
    };

    getDetail = (req, res: Response) => {
        return this.ModelType
            .findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
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
    };

    update = async (req, res: Response) => {
        const jsonUpdate = { ...req.body };
        await this.beforeSave(jsonUpdate);
        this.ModelType.updateOne({ _id: req.params.id }, { $set: jsonUpdate })
            .then(async (newUser) => {
                await this.afterUpdate(jsonUpdate, req.body);
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
    };

    delete = (req, res: Response) => {
        this.ModelType.deleteOne({ _id: req.params.id })
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
    };

    getAll = (req, res: Response) => {
        this.ModelType.find()
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
    };

    getAllByFilter = (req, res: Response) => {
        const query = this.createQueryFromBody(this.ModelType, req.body);
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
    };

    getData = async (req, res: Response) => {
        const [query, filters] = this.createQueryWithFilterFromBody(this.ModelType, req.body);
        Promise.all([
            this.ModelType.count(filters),
            query
        ]).then(([totalRecord, allUser]) => {
            return res.status(200).json({
                success: true,
                data: allUser,
                totalRecord: totalRecord,
            });
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Có lỗi',
                error: err.message,
            });
        });
    };

    getDetailByFilter = (req, res: Response) => {
        const filters = this.getFilterFromBody(req.body.filters);
        return this.ModelType
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
    };

    async beforeSave(model) {

    }

    async afterInsert(model: any, body: any) {
    }

    async afterUpdate(model: any, body: any) {

    }

    // #region utils
    createQueryFromBody(type, body) {
        const [query] = this.createQueryWithFilterFromBody(type, body);
        return query;
    }

    createQueryWithFilterFromBody(type, body) {
        let filters = {};
        if (body.filters) {
            filters = this.getFilterFromBody(body.filters);
        }
        let query = type.find(filters);
        if (body.sorts && body.sorts.length) {
            const sorts = {};
            body.sorts.forEach((sort) => {
                sorts[sort.field] = sort.dir ? sort.dir : 1;
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

    getFilterFromBody(filterFromBody, logic = 'and') {
        const filters = {};
        if (filterFromBody) {
            const keyLogic = `$${logic}`;
            filters[keyLogic] = [];
            filterFromBody.forEach((item) => {
                this.getFilterItem(filters[keyLogic], item);
            });
            if (filters[keyLogic].length == 0) return {};
            if (filters[keyLogic].length == 1) {
                return filters[keyLogic][0];
            }
        }
        return filters;
    }

    getFilterItem(filters, item) {
        if (item.logic) {
            const childFilter = this.getFilterFromBody(item.filters, item.logic);
            filters.push(childFilter);
        }
        else {
            if (item.operator == 'in') {
                filters.push({
                    [item.field]: { '$in': JSON.parse(item.value) }
                });
            }
            else if (item.operator == 'contains') {
                filters.push({
                    [item.field]: {
                        '$regex': `${JSON.parse(item.value)}`,
                        '$options': 'i'
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
    // #endregion
}
