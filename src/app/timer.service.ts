import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private pomodoroTime = this.convertToSeconds(30); //Default time is 30 minutes
  private timeSet = 30;
  private intervalID = null;


  constructor() { 
  }


  private convertToSeconds(minutes: number): number {
    return (minutes * 60);
  }

  setTime(minutes: number)
  {
    this.timeSet = minutes;
    this.pomodoroTime = this.convertToSeconds(this.timeSet);
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
    clearInterval(this.intervalID);
    // Call this.countDown, bind the call to this service using arrow operator.
    this.intervalID = window.setInterval(() => this.countDown(), 1000);
  }

  getTime(): string
  {
    return this.formatTime(this.pomodoroTime);
  }

  countDown(): void 
  {
    this.pomodoroTime--;
  }

  stopTimer()
  {
    clearInterval(this.intervalID);
  }

  resetTimer()
  {
    clearInterval(this.intervalID);
    this.pomodoroTime = this.convertToSeconds(this.timeSet);
  }

}
