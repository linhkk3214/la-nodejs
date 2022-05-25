
import DM_ChucVu from '../models/dm-chucvu';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(DM_ChucVu);
}
