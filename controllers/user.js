
import User from '../models/user';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(User);
}
