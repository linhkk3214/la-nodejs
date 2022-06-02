
import DM_LoaiGiayTo from '../models/dm-loaigiayto';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(DM_LoaiGiayTo);
}
