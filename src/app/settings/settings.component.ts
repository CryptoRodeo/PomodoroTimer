import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';
import { NotificationService } from '../notification.service';
import { PomodoroTimePeriods } from '../pomodoro-time-periods';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private timerService: TimerService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  logTimePeriods(): void {
    console.log(this.timerService.getTimePeriods());
  }

  getTimePeriods(): PomodoroTimePeriods {
    return this.timerService.getTimePeriods();
  }

  defaultShortBreak(): number {
    return this.timerService.getDefaultShortBreak();
  }

  defaultLongBreak(): number {
    return this.timerService.getDefaultLongBreak();
  }
}
