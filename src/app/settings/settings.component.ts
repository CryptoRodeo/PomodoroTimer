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
      soundOptions: new FormControl(this.getAudioFiles())
    }),
    volumePreferences: new FormGroup({
      volumeOptions: new FormControl({})
    }),
    notificationPreferences: new FormGroup({
      timerIndication: new FormControl(this.getBrowserTabPermission()),
      browserNotification: new FormControl(this.getBrowserNotificationPermission()),
      autoStartTimer: new FormControl(this.autoStartTimer())
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

  getTimePeriods(): PomodoroTimePeriods {
    return this.timerService.getTimePeriods();
  }

  getAudioFiles(): Array<String> {
    return Object.getOwnPropertyNames(this.notificationService.getAudioFiles());
  }

  getBrowserNotificationPermission(): Boolean {
    return this.notificationService.getPermissionGranted();
  }

  getBrowserTabPermission(): Boolean {
    return this.timerService.browserTabIndicationAllowed();
  }

  autoStartTimer(): Boolean {
    return this.timerService.autoStartTimers();
  }

  applySettings(): void {
    for (let controlName in this.settingsForm.controls) {
      this.delegateSettingsToFunctions(controlName, this.settingsForm.controls[controlName]);
    }
  }

  delegateSettingsToFunctions(settingName, setting: object): void {
    const settingsFunctionDelegator: Object = {
      "alertPreferences": (setting) => { this.saveAlertPreferences(setting) },
      "volumePreferences": (setting) => { this.saveVolumePreferences(setting) },
      "notificationPreferences": (setting) => { this.saveNotificationPreferencers(setting) },
      "timerPreferences": (setting) => { this.saveTimerPreferences(setting) }
    };

    //Delegate the settingchanges to their respective functions using the
    // settingsFunctionDelegator object
    for (const [_settingName, callback] of Object.entries(settingsFunctionDelegator)) {
      if (String(settingName) == _settingName) { callback(setting); };
    }
  }

  saveAlertPreferences(settingChanges: Object): void {
    console.log(settingChanges);
  }

  saveNotificationPreferencers(settingChanges: Object): void {
    console.log(settingChanges);
  }

  saveTimerPreferences(settingChanges: Object): void {
    console.log(settingChanges);
  }

  saveVolumePreferences(settingChanges: Object): void {
    console.log(settingChanges);
  }
}
