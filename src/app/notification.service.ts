import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private audioFiles = {
    beep: '../assets/audio/alarm_beeps.mp3'
  };

  constructor() {

  }

  askNotificationPermission(): void {
    if (!window.Notification) {
      alert('This browser does not support desktop notifications.');
      return;
    }

    if (Notification.permission === 'granted') {
      this.showPermissionNotification();
    }

    else
    {
      // request permission from user
      Notification.requestPermission().then((p) => {
        if (p === 'granted') {
          // show notification here
          this.showPermissionNotification();

        } else {
            console.log('User blocked notifications.');
        }
      }).catch((err) => {
          console.error(err);
      });
    }
  }

  showPermissionNotification(): void {
    const notify = new Notification('Desktop Notifications', {
      body: 'enabled'
    });
  }

  createNotification(header = '', notifBody = '' ): void {
    const notification = new Notification(header, {
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
