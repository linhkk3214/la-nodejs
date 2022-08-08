import DangKyHocNganh2Job from './dangkyhocnganh2';
export default class MainJob {
    run() {
        const job = new DangKyHocNganh2Job();
        job.execute();
    }
}
