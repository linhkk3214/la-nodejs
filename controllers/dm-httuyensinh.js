
import DM_HtTuyenSinh from '../models/dm-httuyensinh';
import { baseCrud } from '../services/base';

export function crud() {
    return baseCrud(DM_HtTuyenSinh);
}
