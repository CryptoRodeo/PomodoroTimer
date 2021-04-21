import { Injectable } from '@angular/core';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private audioFiles = {
    beep: { file: '../assets/audio/alarm_beeps.mp3', selected: true } ,
    retro: { file: '../assets/audio/alarm_beeps.mp3', selected: false },
    nuclear: { file: '../assets/audio/alarm_beeps.mp3', selected: false },
    dog: { file: '../assets/audio/alarm_beeps.mp3', selected: false },
    modern: { file: '../assets/audio/alarm_beeps.mp3', selected: false }
  };


  private audioSettings = {
    duration: 4.5
  }
  
  private notificationIcon = '../assets/tomato.png';

  constructor(private permissionService: PermissionService) {}

  updateTitle(): void {
  }

  getAudioFiles(): Object {
    return this.audioFiles;
  }

  getSelectedAudioTone(): object {
    for (const [audio, props] of Object.entries(this.audioFiles)) {
      if ( props.selected == true ) {
        return props;
      }
    }
  }

  setSelectedAudioTone():void {
  }

  getAudioDuration(): number {
    return this.audioSettings.duration;
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

  playAlert(): void {
    // Check if AudioContext is available in the browser API
    var AudioContext = window["AudioContext"]
    || window['webkitAudioContext']
    || false;

    if (AudioContext) {
      let selectedAudioTone = this.getSelectedAudioTone();
      const selectedTone = new Audio(selectedAudioTone["file"]);
      this.limitAudioDuration(selectedTone);
      selectedTone.play();
      return;
    }
    alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
    return;
  }

  limitAudioDuration(audio): void {
    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime >= this.getAudioDuration()) {
        audio.pause();
      }
    });
  }
}
