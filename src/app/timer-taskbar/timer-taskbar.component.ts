import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'timer-taskbar',
  templateUrl: './timer-taskbar.component.html',
  styleUrls: ['./timer-taskbar.component.css']
})
export class TimerTaskbarComponent implements OnInit {

  constructor(private timerService: TimerService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  startTimer() {
    this.timerService.startTimer();
  }

  startPomodoro() {
    this.timerService.stopTimer();
    this.timerService.setPomodoro();
    this.startTimer();
  }

  shortBreak() {
    this.timerService.stopTimer();
    this.timerService.setShortBreak();
    this.startTimer();
  }

  longBreak() {
    this.timerService.stopTimer();
    this.timerService.setLongBreak();
    this.startTimer();
  }

}
