export class BaoCaoNhapHoc {
    soCTDT: string;
    ten: string;
    soSinhVienNopDu: number;
    soSinhVienNopThieu: number;
    soSinhVienChuaNop: number;
    soSinhVienDaRut: number;
    constructor(init?: BaoCaoNhapHoc) {
        for (const key in init) {
            this[key] = init[key];
        }
    }
}