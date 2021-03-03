import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private audioFiles = {
    beep: '../assets/audio/alarm_beeps.mp3'
  }

  constructor() { 
  
  }

  playBeep() {
    let beep = new Audio(this.audioFiles.beep);
    beep.play();
    this.limitAudioDuration(beep);
  }

  limitAudioDuration(audio) {
    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime >= 4.5) {
        audio.pause();
      }
    });
  }
}
