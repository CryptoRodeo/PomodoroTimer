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

  askNotificationPermission() {
    if (!window.Notification) {
      alert('This browser does not support desktop notifications.');
      return
    }

    if (Notification.permission === 'granted') {
      let notify = new Notification('Hello!', {
        body: 'How are you doing?'
      });
    }
    else
    {
      // request permission from user
      Notification.requestPermission().then((p) => {
        if (p === 'granted') {
          console.log('permission granted');
          // show notification here
          var notify = new Notification('Hi there!', {
              body: 'How are you doing?'
          });

        } else {
            console.log('User blocked notifications.');
        }
      }).catch(function (err) {
          console.error(err);
      });
    }
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
