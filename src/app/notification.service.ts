import { Injectable } from '@angular/core';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private audioFiles = {
    beep: '../assets/audio/alarm_beeps.mp3',
    retro: '../assets/audio/alarm_beeps.mp3',
    nuclear: '../assets/audio/alarm_beeps.mp3',
    dog: '../assets/audio/alarm_beeps.mp3',
    modern: '../assets/audio/alarm_beeps.mp3'
  };

  private notificationIcon = '../assets/tomato.png';

  constructor(private permissionService: PermissionService) {}

  updateTitle(): void {

  }
  getAudioFiles(): Object {
    return this.audioFiles;
  }

  getBrowserNotificationPermission(): Boolean {
    return this.permissionService.browserNotificationsAllowed();
  }

  showPermissionNotification(): Notification {
    return new Notification('Desktop Notifications', {
      icon: this.notificationIcon,
      body: 'enabled'
    });
  }

  createNotification(header = '', notifBody = '' ): Notification {
    return new Notification(header, {
      body: notifBody
    });
  }

  playBeep(): void {
    const ctx = new AudioContext();
    const beep = new Audio(this.audioFiles.beep);
    beep.play();
    this.limitAudioDuration(beep);
  }

  limitAudioDuration(audio): void {
    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime >= 4.5) {
        audio.pause();
      }
    });
  }
}
