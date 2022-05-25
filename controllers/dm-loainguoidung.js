
import DM_LoaiNguoiDung from '../models/dm-loainguoidung';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(DM_LoaiNguoiDung);
}
