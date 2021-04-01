import { Injectable, Input } from '@angular/core';
import { NotificationService } from './notification.service';
import { PomodoroTimePeriods } from './pomodoro-time-periods';
import { TimeManager } from './time-manager';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timePeriods: PomodoroTimePeriods = {
    pomodoro: 30,
    shortBreak: 5,
    longBreak: 10
  };

  private tabIndicatorAllowed = true;
  private autoStartTimer = false;
  // private timeManager = {
  //   timeSet: this.timePeriods.pomodoro,
  //   currentCountDownValue: this.timePeriods.pomodoro
  // };

  private timeManager = new TimeManager(this.timePeriods.pomodoro);
  // private timeSet = this.timePeriods.pomodoro; // By default use the Pomodoro time period
  // private currentCountDownValue = this.convertToSeconds(this.timePeriods.pomodoro);
  private timerStarted = false;
  private title = document.querySelector('title');
  private timerIntervalID = null;
  private isPomodoro = false;
  private isBreak = false;

  constructor(private notificationService: NotificationService) {

  }

  // private convertToSeconds(minutes: number): number {
  //   return (minutes * 60);
  // }

  autoStartTimers(): Boolean {
    return this.autoStartTimer;
  }

  getTimePeriods(): PomodoroTimePeriods {
    return this.timePeriods;
  }

  getDefaultPomodoro(): number {
    return this.timePeriods.pomodoro;
  }

  getDefaultShortBreak(): number {
    return this.timePeriods.shortBreak;
  }

  getDefaultLongBreak(): number {
    return this.timePeriods.longBreak;
  }

  setDefaultPomodoro(val): void {
    this.timePeriods.pomodoro = val;
  }

  setDefaultShortBreak(val): void {
    this.timePeriods.shortBreak = val;
  }

  setDefaultLongBreak(val): void {
    this.timePeriods.longBreak = val;
  }

  setPomodoro(): void {
    this.clearIntervalIDs();
    this.setTime(this.timePeriods.pomodoro);
    this.updateTitle();
  }

  setShortBreak(): void {
    this.clearIntervalIDs();
    this.setTime(this.timePeriods.shortBreak);
    this.updateTitle();
  }

  setLongBreak(): void {
    this.clearIntervalIDs();
    this.setTime(this.timePeriods.longBreak);
    this.updateTitle();
  }

  /**
   * This seems redundant.
   */
  setTime(minutes: number): void
  {
    this.timeManager.setTimePeriod(minutes);
  }

  timerRunning(): boolean {
    return this.timerStarted;
  }

  formatTime(timeInSeconds: number): string {
    const time = new Date(timeInSeconds * 1000);
    /**
     * Get minutes and seconds, add padding.
     */
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${minutes} : ${seconds}`;
  }

  browserTabIndicationAllowed(): Boolean {
    return this.tabIndicatorAllowed;
  }

  startTimer(): void
  {
    if (this.timerStarted ) { return; }
    this.timerStarted = true;
    this.clearIntervalIDs();
    this.updateTitle();
    // Call this.countDown && this.updateTile(), bind the call to this service using arrow operator.
    // Will probably move the title updating to a component or service soon.
    this.timerIntervalID = window.setInterval(() => { this.countDown(); this.updateTitle(); }, 1000);
  }

  getTime(): string
  {
    return this.timeManager.formatTime();
//    return this.formatTime(this.currentCountDownValue);
  }

  updateTitle(): void {
    if (!this.browserTabIndicationAllowed()) {
      return;
    }
    this.title.innerHTML = `( ${this.getTime()} )`;
  }

  countDown(): void
  {
    if (this.timeManager.countDownValue > 0) {
      this.timeManager.countDown();
      // console.log(`from the timer service ${this.currentCountDownValue}`);
      // this.currentCountDownValue--;
      return;
    }
    this.notifyUser();
    this.resetTimer();
  }

  stopTimer(): void
  {
    this.clearIntervalIDs();
    this.timerStarted = false;
  }

  formatNotification(): { header , body } {
    if ( this.timeManager.timePeriod !== this.timePeriods.pomodoro )
    {
      return { header: 'Break over', body: '' };
    }
    return { header: 'Pomodoro over', body: 'Take a break!' };
  }

  resetTimer(): void
  {
    this.clearIntervalIDs();
    this.timeManager.resetCountDownValue();
//    this.currentCountDownValue = this.convertToSeconds(this.timeSet);
    this.updateTitle();
    this.timerStarted = false;
  }

  notifyUser(): void {
    this.notificationService.playBeep();
    const notificationObj = this.formatNotification();
    const { header, body } = notificationObj;
    this.notificationService.createNotification( header, body );
  }

  clearIntervalIDs(): void {
    clearInterval(this.timerIntervalID);
  }

}
