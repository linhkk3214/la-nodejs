import { BaseController } from '../base/base-controller';
import DM_HanhKiem from '../models/dm-hanhkiem';

export class DM_HanhKiemController extends BaseController {
    constructor() {
        super(DM_HanhKiem);
    }
}
