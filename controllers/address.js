
import model from '../models/address';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(model);
}
