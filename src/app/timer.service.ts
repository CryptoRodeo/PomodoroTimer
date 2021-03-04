import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private pomodoroTime = this.convertToSeconds(30); //Default time is 30 minutes
  private timeSet = 30;
  private timerStarted = false;
  private title = document.querySelector('title');
  private timerIntervalID = null;

  constructor(private notificationService: NotificationService) { 
  }


  private convertToSeconds(minutes: number): number {
    return (minutes * 60);
  }

  setPomodoro() {
    this.clearIntervalIDs();
    this.setTime(30);
    this.updateTitle();
  }

  setShortBreak() {
    this.clearIntervalIDs();
    this.setTime(5);
    this.updateTitle();
  }

  setLongBreak() {
    this.clearIntervalIDs();
    this.setTime(10);
    this.updateTitle();
  }

  setTime(minutes: number)
  {
    this.timeSet = minutes;
    this.pomodoroTime = this.convertToSeconds(this.timeSet);
  }

  timerRunning(): boolean {
    return this.timerStarted;
  }

  formatTime(timeInS: number): string {
    let time = new Date(timeInS * 1000);
    /**
     * Get minutes and seconds, add padding.
     */
    let minutes = time.getUTCMinutes().toString().padStart(2,'0');
    let seconds = time.getSeconds().toString().padStart(2,'0');
    return `${minutes} : ${seconds}`;
  }

  startTimer()
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
    this.resetTimer();
  }

  stopTimer()
  {
    this.clearIntervalIDs()
    this.timerStarted = false;
  }

  resetTimer()
  {
    this.clearIntervalIDs()
    this.pomodoroTime = this.convertToSeconds(this.timeSet);
    this.updateTitle();
    this.timerStarted = false;
    this.notificationService.playBeep();
  }

  clearIntervalIDs() {
    clearInterval(this.timerIntervalID);
  }

}
