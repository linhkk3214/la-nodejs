
import DM_TpHoSo from '../models/dm-tphoso';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(DM_TpHoSo);
}
