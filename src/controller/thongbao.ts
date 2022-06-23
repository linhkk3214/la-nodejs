import { BaseController } from '../base/base-controller';
import ThongBao from '../models/thongbao';

export class ThongBaoController extends BaseController {
    constructor() {
        super(ThongBao);
    }
}
