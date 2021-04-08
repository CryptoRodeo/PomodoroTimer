import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private base_permissions = {
    browserTabNotification: true,
    browserNotifications: ( Notification.permission === 'granted' ) 
  }

  constructor() { }

  browserTabNotificationsAllowed(): Boolean {
    return this.base_permissions.browserTabNotification;
  }

  browserNotificationsAllowed(): Boolean {
    if (!this.base_permissions.browserNotifications) {
      return this.requestPermissionForBrowserNotifications();
    }
    return this.base_permissions.browserNotifications;
  }

  requestPermissionForBrowserNotifications(): Boolean {
    if (!window.Notification) {
      alert('This browser does not support desktop notifications.');
      return;
    }

    if (Notification.permission === 'granted') {
      return true;
    }
    // request permission from user
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') { return true; } 
      return false;
    }).catch((err) => {
        console.error(err);
    });
  }
}
