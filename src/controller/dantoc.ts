import { BaseController } from '../base/base-controller';
import DanToc from '../models/dantoc';

export class DanTocController extends BaseController {
    constructor() {
        super(DanToc);
    }
}
