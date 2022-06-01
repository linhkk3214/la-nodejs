
import model from '../models/dm-loainguoidung';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(model);
}
