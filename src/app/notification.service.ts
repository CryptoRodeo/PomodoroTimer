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
    duration: 4.5,
    volume: .5
  };
  
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

  unSetAudioToneSelection(): void {
    for (const [audio, props] of Object.entries(this.audioFiles)) { 
      props.selected = false; 
    }
  }

  setSelectedAudioTone(audioTone: string):void {
    //Check if this audioTone exists in the audioFiles object.
    if (! (audioTone in this.audioFiles) ) {
      console.error('Invalid audio tone set');
      return;
    }
    this.unSetAudioToneSelection();
    this.audioFiles[audioTone].selected = true;
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
      this.applyAudioSettings(selectedTone);
      selectedTone.play();
      return;
    }
    alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
    return;
  }

  applyAudioSettings(audio: Object): void {
    this.limitAudioDuration(audio);
    this.limitAudioVolume(audio);
  }

  limitAudioDuration(audio): void {
    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime >= this.getAudioDuration()) {
        audio.pause();
      }
    });
  }

  limitAudioVolume(audio: Object): void {
    audio["volume"] = this.audioSettings.volume;
  }

  setAudioVolume(volume: number = this.audioSettings.volume): void {
    this.audioSettings.volume = volume;
  }
}
