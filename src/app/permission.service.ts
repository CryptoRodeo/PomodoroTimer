import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private base_permissions = {
    browserTabNotification: true,
    browserNotifications: ( Notification.permission === 'granted' ),
    autoStartTimer: false
  }

  constructor() { }

  browserTabNotificationsAllowed(): Boolean {
    return this.base_permissions.browserTabNotification;
  }

  browserNotificationsAllowed(): boolean {
    return this.base_permissions.browserNotifications ||= this.requestPermissionForBrowserNotifications();
  }

  getPermissions(): object {
    return this.base_permissions;
  }

  hasPermission(perm: string): boolean {
    return this.base_permissions.hasOwnProperty(perm);
  }

  setPermissions(new_perms: object) {
    Object.assign(this.base_permissions, new_perms);
  }

  requestPermissionForBrowserNotifications(): boolean {
    if (!window.Notification) {
      alert('This browser does not support desktop notifications.');
      return;
    }

    if (Notification.permission === 'granted') {
      return true;
    }
    // request permission from user
    Notification.requestPermission().then((permission) => {
      return permission === 'granted';
    }).catch((err) => {
        console.error(err);
    });
  }
}
