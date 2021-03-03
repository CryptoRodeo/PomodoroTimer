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
//    this.notificationService.playBeep();
    this.notificationService.askNotificationPermission();
    this.timerService.stopTimer();
    this.timerService.setTime(30);
    this.startTimer();
  }

  shortBreak() {
    this.timerService.stopTimer();
    this.timerService.setTime(5);
    this.startTimer();
  }

  longBreak() {
    this.timerService.stopTimer();
    this.timerService.setTime(10);
    this.startTimer();
  }

}
