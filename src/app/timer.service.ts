import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timePeriods = {
    pomodoro: 30,
    shortBreak: 5,
    longBreak: 10
  };

  private pomodoroTime = this.convertToSeconds(30); // Default time is 30 minutes
  private timeSet = this.timePeriods.pomodoro;
  private timerStarted = false;
  private title = document.querySelector('title');
  private timerIntervalID = null;
  private isPomodoro = false;
  private isBreak = false;



  constructor(private notificationService: NotificationService) {

  }

  private convertToSeconds(minutes: number): number {
    return (minutes * 60);
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

  setTime(minutes: number): void
  {
    this.timeSet = minutes;
    this.pomodoroTime = this.convertToSeconds(this.timeSet);
  }

  timerRunning(): boolean {
    return this.timerStarted;
  }

  formatTime(timeInS: number): string {
    const time = new Date(timeInS * 1000);
    /**
     * Get minutes and seconds, add padding.
     */
    const minutes = time.getUTCMinutes().toString().padStart(2,'0');
    const seconds = time.getSeconds().toString().padStart(2,'0');
    return `${minutes} : ${seconds}`;
  }

  startTimer(): void
  {
    if (this.timerStarted ) { return; }
    this.timerStarted = true;
    this.clearIntervalIDs()
    this.updateTitle();
    // Call this.countDown && this.updateTile(), bind the call to this service using arrow operator.
    // Will probably move the title updating to a component or service soon.
    this.timerIntervalID = window.setInterval(() => { this.countDown(); this.updateTitle(); }, 1000);
  }

  getTime(): string
  {
    return this.formatTime(this.pomodoroTime);
  }

  updateTitle(): void {
    this.title.innerHTML = `( ${this.getTime()} )`;
  }

  countDown(): void
  {
    if (this.pomodoroTime > 0) {
      this.pomodoroTime--;
      return;
    }
    this.notifyUser();
    this.resetTimer();
  }

  stopTimer(): void
  {
    this.clearIntervalIDs()
    this.timerStarted = false;
  }

  formatNotification(): { header , body } {
    if ( this.timeSet === this.timePeriods.shortBreak || this.timeSet === this.timePeriods.longBreak)
    {
      return { header: 'Break over', body: '' };
    }
    return { header: 'Pomodoro over', body: 'Take a break!' };
  }

  resetTimer(): void
  {
    this.clearIntervalIDs()
    this.pomodoroTime = this.convertToSeconds(this.timeSet);
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
