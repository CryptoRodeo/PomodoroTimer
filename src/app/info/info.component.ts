import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { PermissionService } from '../permission.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor
  (
    private notificationService: NotificationService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {}

  enableDesktopNotifications(): void {
    if (this.permissionService.browserNotificationsAllowed()) {
      this.notificationService.showPermissionNotification();
    }
  }

}
