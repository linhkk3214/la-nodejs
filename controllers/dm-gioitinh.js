
import model from '../models/dm-gioitinh';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(model);
}
