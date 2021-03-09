import { KeyValuePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TimerService } from './timer.service';
import { ModalService } from './modal.service';
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

  title = 'pomodoro-timer';

  constructor(private timerService: TimerService, private modalService: ModalService) {}

  @HostListener('window:keydown', ['$event']) onKeyDown(e): void {
    if (e.key === KEY.SPACE) {
      this.toggleTimer();
    }

    else if (e.altKey && e.keyCode === KEY.P) {
      this.timerService.setPomodoro();
    }

    else if (e.altKey && e.keyCode === KEY.S) {
      this.timerService.setShortBreak();
    }

    else if (e.altKey && e.keyCode === KEY.L) {
      this.timerService.setLongBreak();
    }

    else if (e.altKey && e.keyCode === KEY.R) {
      this.timerService.resetTimer();
    }
  }

  toggleTimer(): void {
    if(this.timerService.timerRunning()) {
      this.timerService.stopTimer();
    }
    else {
      this.timerService.startTimer();
    }
  }

  openModal(id: string) {
    console.log(id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
