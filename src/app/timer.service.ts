import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  pomodoroTime = 1800; //Default time is 30 minutes
  intervalID = 0;


  constructor() { 
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

}
