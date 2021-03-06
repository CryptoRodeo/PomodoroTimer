import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  enableDesktopNotifications() {
    this.notificationService.askNotificationPermission();
  }

}
