/* MOCK */
class NotificationService {
    constructor() {
        this.count = 1;
    }
    __setCount(theCount) {
        this.count = theCount;
    }
    getNotification() {
        const newState = { count:this.count };
        console.log(`GOOD JOB USING MOCK SERVICE -> return :${JSON.stringify(newState)}`);
        return newState;
    }
}
// Return singleton instance
export default new NotificationService();