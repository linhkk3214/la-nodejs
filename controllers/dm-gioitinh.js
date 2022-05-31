
import DM_GioiTinh from '../models/dm-gioitinh';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(DM_GioiTinh);
}
