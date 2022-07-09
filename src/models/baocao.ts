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

export class BaoCaoNguoiHocTheoNganh {
    soCTDT: string;
    ten: string;
    // Một số cột dynamic k khai báo được sẽ add sau trong code thống kê
    constructor(init?: BaoCaoNguoiHocTheoNganh) {
        for (const key in init) {
            this[key] = init[key];
        }
    }
}

export class BaoCaoNguoiHocTheoKhoa {
    ten: string;
    // Một số cột dynamic k khai báo được sẽ add sau trong code thống kê
    constructor(init?: BaoCaoNguoiHocTheoKhoa) {
        for (const key in init) {
            this[key] = init[key];
        }
    }
}

export class BaoCaoSinhVienDkNganh2 {
    id: string;
    ten: string;
    lstIdNguoiHoc: string[];
    constructor(init?: BaoCaoSinhVienDkNganh2) {
        for (const key in init) {
            this[key] = init[key];
        }
    }
}