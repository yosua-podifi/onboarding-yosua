class NotificationService {
  notifications: [];
  constructor() {
    this.notifications = [];
  }

  // Send a new notification
  sendNotification(notification: never) {
    // For now, just push to an in-memory array (can be expanded to actual messaging system later)
    this.notifications.push(notification);
    console.log("Notification Sent:", notification);
  }

  // Get all notifications (for debugging)
  getAllNotifications() {
    return this.notifications;
  }
}

module.exports = new NotificationService();
