const { ipcRenderer } = require('electron');


const OldNotification = Notification;

// for webview apps we catch their push notifications and send it via ipc message to the main app
Notification = function (title, options) {
  ipcRenderer.sendToHost('webviewNotification', { title, options });
};

Notification.prototype = OldNotification.prototype;
Notification.permission = OldNotification.permission;
Notification.requestPermission = OldNotification.requestPermission;