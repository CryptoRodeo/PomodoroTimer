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
  // Audio alter files
  audioFiles: Array<String> = Object.getOwnPropertyNames(this.notificationService.getAudioFiles());
  browserNotificationPermission: Boolean = this.notificationService.getPermissionGranted();
  browserTabNotificationAllowed: Boolean = this.timerService.browserTabIndicationAllowed();
  autoStartTimers: Boolean = this.timerService.autoStartTimers();

  settingsForm = new FormGroup({
    alertPreferences: new FormGroup({
      soundOptions: new FormControl(this.audioFiles)
    }),
    volumePreferences: new FormGroup({
      volumeOptions: new FormControl({})
    }),
    notificationPreferences: new FormGroup({
      timerIndication: new FormControl(this.browserTabNotificationAllowed),
      browserNotification: new FormControl(this.browserNotificationPermission),
      autoStartTimer: new FormControl(this.autoStartTimers)
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
