class NotificationService  {

    getNotification() {
        console.log(`REAL NOTIFICATION SERVICES! REALLY CONTACT API`);
        return { count : 42 };
    }
}

// Return singleton instance
export default new NotificationService();