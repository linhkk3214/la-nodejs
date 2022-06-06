import { BaseController } from '../base/base-controller';
import QuocTich from '../models/quoctich';

export class QuocTichController extends BaseController {
    constructor() {
        super(QuocTich);
    }
}
