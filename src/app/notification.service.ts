import { Injectable } from '@angular/core';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private audioFiles = [
    { 
      name: 'beep',
      file: '../assets/audio/alarm_beeps.mp3', 
      selected: true 
    } ,
    { 
      name: 'retro',
      file: '../assets/audio/alarm_beeps.mp3', 
      selected: false 
    },
    { 
      name: 'nuclear',
      file: '../assets/audio/alarm_beeps.mp3', 
      selected: false 
    },
    { 
      name: 'dog',
      file: '../assets/audio/alarm_beeps.mp3', 
      selected: false 
    },
    { 
      name: 'modern',
      file: '../assets/audio/alarm_beeps.mp3', 
      selected: false 
    }
  ];


  private audioSettings = {
    duration: 2.5,
    volumeOptions: [
      {
        volume: 0,
        selected: false
      },
      {
        volume: 0.25,
        selected: false
      },
      {
        volume: 0.5,
        selected: false
      },
      {
        volume: 0.75,
        selected: false
      },
      {
        volume: 1,
        selected: true 
      }
    ]
  };
  
  private notificationIcon = '../assets/tomato.png';

  constructor(private permissionService: PermissionService) {}

  updateTitle(): void {
  }

  getAudioFiles(): Object {
    return this.audioFiles;
  }

  getAudioFileNames(): Array<string> {
    return this.audioFiles.map(af => af.name);
  }

  getSelectedAudioTone(): object {
    console.log('i was called');
    console.log(this.audioFiles.find(af => af.selected == true));
    return this.audioFiles.find(af => af.selected == true);
  }

  unSetAudioToneSelection(): void {
    for (const audio of this.audioFiles) { 
      audio.selected = false; 
    }
  }

  getAudioFile(_name: string) {
    return this.audioFiles.find(af => af["name"] == _name);
  }

  setSelectedAudioTone(audioTone: string):void {
    //Check if this audioTone exists in the audioFiles object.
    if (!(this.getAudioFileNames().includes(audioTone)) ) {
      console.error('Invalid audio tone set');
      return;
    }
    this.unSetAudioToneSelection();
    this.getAudioFile(audioTone).selected = true;
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

  getSelectedAudioFile(): HTMLAudioElement {
    let audioFileSelected = this.getSelectedAudioTone();
    return new Audio(audioFileSelected["file"]);
  }

  playAlert(): void {
    // Check if AudioContext is available in the browser API
    var AudioContext = window["AudioContext"]
    || window['webkitAudioContext']
    || false;

    if (AudioContext) {
      this.getSelectedAudioFile().play();
      return;
    }
    alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
    return;
  }

  sampleAlert(): void {

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

  getVolumeOptions(): Array<{volume:number, selected:boolean}> {
    return this.audioSettings.volumeOptions;
  }

  resetVolumeOptions(): void {
    this.getVolumeOptions().forEach((vol) => vol["selected"] = false);
  }

  getSelectedAudioVolume(): Object {
    return this.getVolumeOptions().filter(vol => vol.selected)[0];
  }

  limitAudioVolume(audio: Object): void {
    audio["volume"] = this.getSelectedAudioVolume();
  }

  setAudioVolume(volume: number = null): void {
    if ( volume == null) { return }
    this.resetVolumeOptions();
    let newVolumeSettings: Array<{volume: number, selected: boolean}> = 
    this.getVolumeOptions()
    .map((volumeOption) => 
    { 
      volumeOption["volume"] == volume ? volumeOption["selected"] = true : volumeOption["selected"] = false
      return volumeOption;
    });
    this.updateAudioVolumeSettings(newVolumeSettings);
  }

  private updateAudioVolumeSettings(newVolumeSettings: Array<{volume: number, selected: boolean}>): void {
    this.audioSettings["volume"] = newVolumeSettings;
  }
}
