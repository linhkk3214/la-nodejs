
import model from '../models/dm-chucvu';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(model);
}
