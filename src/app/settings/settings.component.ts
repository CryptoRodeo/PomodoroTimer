import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';
import { NotificationService } from '../notification.service';
import { PomodoroTimePeriods } from '../pomodoro-time-periods';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm = new FormGroup({
    alertPreferences: new FormGroup({
      soundOptions: new FormControl() 
    }),
    volumePreferences: new FormGroup({
      volumeOptions: new FormControl({})
    }),
    notificationPreferences: new FormGroup({
      timerIndication: new FormControl(true),
      browserNotification: new FormControl(true),
      autoStartTimer: new FormControl(true)
    }),
    timerPreferences: new FormGroup({
      pomodoroSetting: new FormControl(this.getTimePeriods().pomodoro),
      shortBreakSetting: new FormControl(this.getTimePeriods().shortBreak),
      longBreakSetting: new FormControl(this.getTimePeriods().longBreak)
    })
  });
  constructor(private timerService: TimerService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  logTimePeriods(): void {
    console.log(this.timerService.getTimePeriods());
    console.log(this.settingsForm);
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
