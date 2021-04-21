import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { TimerService } from '../timer.service';
import { NotificationService } from '../notification.service';
import { PermissionService } from '../permission.service';
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
      pomodoroSetting: new FormControl(this.timerService.getPomodoroTimeValue()),
      shortBreakSetting: new FormControl(this.timerService.getShortBreakTimeValue()),
      longBreakSetting: new FormControl(this.timerService.getLongBreakTimeValue())
    })
  });

  constructor
  (
    private timerService: TimerService, 
    private notificationService: NotificationService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
  }

  getAudioFiles(): Array<String> {
    return Object.getOwnPropertyNames(this.notificationService.getAudioFiles());
  }

  getBrowserNotificationPermission(): Boolean {
    return this.permissionService.browserTabNotificationsAllowed();
  }

  getBrowserTabPermission(): Boolean {
    return this.permissionService.browserTabNotificationsAllowed();
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
      "alertPreferences": (setting) => this.saveAlertTonePreference(setting),
      "volumePreferences": (setting) => this.saveVolumePreferences(setting),
      "notificationPreferences": (setting) => this.saveNotificationPreferences(setting),
      "timerPreferences": (setting) => this.saveTimerPreferences(setting)
    };

    //Delegate the settingchanges to their respective functions using the
    // settingsFunctionDelegator object
    for (const [_settingName, callback] of Object.entries(settingsFunctionDelegator)) {
      if (String(settingName) == _settingName) { callback(setting); };
    }
  }

  saveAlertTonePreference(settingChanges: Object): void {
    let alertChanges = this.extractControls(settingChanges);
    let toneSelected = alertChanges["soundOptions"].value;
    if (typeof toneSelected == 'object') { return; }
    this.notificationService.setSelectedAudioTone(toneSelected);
  }

  saveNotificationPreferences(settingChanges: Object): void {
    let notificationChanges = this.extractControls(settingChanges);

    let notificationPreferences = {
      autoStartTimer: notificationChanges["autoStartTimer"].value,
      browserNotification: notificationChanges["browserNotification"].value,
      timerIndication: notificationChanges["timerIndication"].value,
    }
    this.permissionService.setPermissions(notificationPreferences);
  }

  saveTimerPreferences(settingChanges: Object ): void {
    let timerControlValues = this.extractControls(settingChanges);
    
    let timerSetting = {
      pomodoroSetting: timerControlValues["pomodoroSetting"].value,
      longBreakSetting: timerControlValues["longBreakSetting"].value,
      shortBreakSetting: timerControlValues["shortBreakSetting"].value
    };

    let { pomodoroSetting, longBreakSetting, shortBreakSetting } = timerSetting;

    this.timerService.setDefaultPomodoro(pomodoroSetting);
    this.timerService.setDefaultShortBreak(shortBreakSetting);
    this.timerService.setDefaultLongBreak(longBreakSetting);
  }

  saveVolumePreferences(settingChanges: Object): void {
    let volumeChanges = this.extractControls(settingChanges);
    let volumeSelected = volumeChanges["volumeOptions"].value;
    //Check for whether a volume preference was selected
    if (typeof volumeSelected == 'object') { return; }
    this.notificationService.setAudioVolume(volumeSelected);
  }

  playAudioFileSelected(): void {
    this.notificationService.playAlert();
  }

  private extractControls(settingControl: Object): Object {
    return settingControl["controls"];
  }
}
