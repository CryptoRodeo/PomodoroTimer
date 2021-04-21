import { Injectable, Input } from '@angular/core';
import { NotificationService } from './notification.service';
import { PermissionService } from './permission.service';
@Injectable({
  providedIn: 'root'
})

export class TimerService {
  private POMODORO = "pomodoro";
  private SHORTBREAK = "shortBreak";
  private LONGBREAK = "longBreak";
  private TIMEPERIODKEYS = [this.POMODORO,this.SHORTBREAK,this.LONGBREAK];

  private defaultTimePeriods = {
    pomodoro: 30,
    shortBreak: 5,
    longBreak: 10
  }
  private TimeManager = {
    pomodoro: 30,
    shortBreak: 5,
    longBreak: 10,
    timePeriodSelected: this.POMODORO,
    countDownValue: null,
    timeFormatted: null
  }

  private tabIndicatorAllowed = true;
  private timerStarted = false;
  private title = document.querySelector('title');
  private timerIntervalID = null;

  constructor(private notificationService: NotificationService, private permissionService: PermissionService) 
  {
    this.TimeManager.countDownValue = this.convertToSeconds(this.getTimePeriodSelected());
    // this.permissionService.setPermissions({ autoStartTimer: false });
  }

  convertToSeconds = (minutes: number): number => {
    return (minutes * 60);
  }

  getPermissions(): object {
    return this.permissionService.getPermissions();
  }

  getTimePeriodSelected(): number {
    let timePeriod: string = this.TimeManager.timePeriodSelected;
    return this.TimeManager[timePeriod];
  }

  getTimeManager() {
    return this.TimeManager;
  }

  autoStartTimers(): boolean {
    if (!this.getPermissions().hasOwnProperty("autoStartTimer")) {
      console.error('autoStartTimer is not a permission set');
      return false;
    }
    let perms = this.getPermissions();
    return perms["autoStartTimer"];
  }

  getPomodoroTimeValue(): number {
    return this.TimeManager.pomodoro;
  }

  getShortBreakTimeValue(): number {
    return this.TimeManager.shortBreak;
  }

  getLongBreakTimeValue(): number {
    return this.TimeManager.longBreak;
  }

  getDefaultShortBreak(): number {
    return this.TimeManager.shortBreak;
  }

  getDefaultLongBreak(): number {
    return this.TimeManager.longBreak;
  }

  setDefaultPomodoro(val): void {
    this.TimeManager.pomodoro = val;

    if (this.TimeManager.timePeriodSelected == this.POMODORO)
    {
      Object.assign(this.TimeManager,{
        countDownValue: this.convertToSeconds(val)
      })
    }
  }

  setDefaultShortBreak(val): void {
    this.TimeManager.shortBreak= val;

    if (this.TimeManager.timePeriodSelected == this.SHORTBREAK)
    {
      Object.assign(this.TimeManager,{
        countDownValue: this.convertToSeconds(val)
      })
    }
  }

  setDefaultLongBreak(val): void {
    this.TimeManager.longBreak = val;
    if (this.TimeManager.timePeriodSelected == this.LONGBREAK)
    {
      Object.assign(this.TimeManager,{
        countDownValue: this.convertToSeconds(val)
      })
    }
  }

  setPomodoro(): void {
    this.clearIntervalIDs();
    this.setTime(this.TimeManager.pomodoro, this.POMODORO);
    this.updateTitle();
  }

  setShortBreak(): void {
    this.clearIntervalIDs();
    this.setTime(this.TimeManager.shortBreak, this.SHORTBREAK);
    this.updateTitle();
  }

  setLongBreak(): void {
    this.clearIntervalIDs();
    this.setTime(this.TimeManager.longBreak, this.LONGBREAK);
    this.updateTitle();
  }

  setTime(minutes: number, type: string): void
  {
    if ( !this.TIMEPERIODKEYS.includes(type) )
    {
      console.error(`Invalid type '${type}' passed. Time could not be set.`);
      return;
    }

    Object.assign(this.TimeManager, {
      timePeriodSelected: type,
      countDownValue: this.convertToSeconds(minutes)
    });
  }

  timerRunning(): boolean {
    return this.timerStarted;
  }


  browserTabIndicationAllowed(): Boolean {
    return this.tabIndicatorAllowed;
  }

  startTimer(): void
  {
    if (this.timerStarted) { return; }
    this.timerStarted = true;
    this.clearIntervalIDs();
    this.updateTitle();
    // Call this.countDown && this.updateTile(), bind the call to this service using arrow operator.
    this.timerIntervalID = window.setInterval(() => { this.countDown(); this.updateTitle(); }, 1000);
  }

  getCountDownValue() {
    return this.TimeManager.countDownValue;
  }

  formatTime(): string {
    const time = new Date(this.getCountDownValue() * 1000);

    /**
     * Get minutes and seconds, add padding.
     */
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${minutes} : ${seconds}`;
  }

  getTime(): string
  {
    return this.formatTime();
  }

  updateTitle(): void {
    if (!this.browserTabIndicationAllowed()) {
      return;
    }
    this.title.innerHTML = `( ${this.getTime()} )`;
  }

  countDown(): void
  {
    if (this.TimeManager.countDownValue > 0) {
      this.TimeManager.countDownValue -= 1;
      return;
    }
    this.notifyUser();
    this.resetTimer();
    if (this.autoStartTimers()) {
      this.setShortBreak();
      this.startTimer();
    }
  }

  stopTimer(): void
  {
    this.clearIntervalIDs();
    this.timerStarted = false;
  }

  formatNotification(): { header , body } {
    if ( this.TimeManager.timePeriodSelected !== this.POMODORO )
    {
      return { header: 'Break over', body: '' };
    }
    return { header: 'Pomodoro over', body: 'Take a break!' }
  }

  resetTimer(): void
  {
    this.clearIntervalIDs();
    this.setTime(this.getTimePeriodSelected(), this.TimeManager.timePeriodSelected);
    this.updateTitle();
    this.timerStarted = false;
  }

  resetTimerValues(): void {
    Object.assign(this.TimeManager,this.defaultTimePeriods);
  }

  notifyUser(): void {
    this.notificationService.playAlert();
    const notificationObj = this.formatNotification();
    const { header, body } = notificationObj;
    this.notificationService.createNotification( header, body );
  }

  clearIntervalIDs(): void {
    clearInterval(this.timerIntervalID);
  }
}
