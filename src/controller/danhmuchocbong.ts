import { BaseController } from '../base/base-controller';
import DanhMucHocBong from '../models/danhmuchocbong';

export class DanhMucHocBongController extends BaseController {
    constructor() {
        super(DanhMucHocBong);
    }
}
