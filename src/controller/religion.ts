import { BaseController } from '../base/base-controller';
import Religion from '../models/religion';

export class ReligionController extends BaseController {
    constructor() {
        super(Religion);
    }
}
