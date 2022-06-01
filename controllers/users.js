
import model from '../models/users';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(model);
}
