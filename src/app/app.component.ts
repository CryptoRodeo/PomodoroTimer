import { KeyValuePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TimerService } from './timer.service';
export enum KEY {
  SPACE = ' ',
  ALT = 'Alt',
  P = 80,
  S =  83,
  L = 76,
  R =  82 
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private timerService: TimerService) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);


  }

  @HostListener('window:keydown', ['$event']) onKeyDown(e) {
    if (e.key == KEY.SPACE) {
      this.toggleTimer();
    }

    else if (e.altKey && e.keyCode == KEY.P) {
      this.timerService.setPomodoro();
    }

    else if (e.altKey && e.keyCode == KEY.S) {
      this.timerService.setShortBreak();
    }

    else if (e.altKey && e.keyCode == KEY.L) {
      this.timerService.setLongBreak();
    }

    else if (e.altKey && e.keyCode == KEY.R) {
      this.timerService.resetTimer();
    }
  }
  title = 'pomodoro-timer';

  toggleTimer() {
    if(this.timerService.timerRunning()) {
      this.timerService.stopTimer();
    }
    else {
      this.timerService.startTimer();
    }
  }
}
