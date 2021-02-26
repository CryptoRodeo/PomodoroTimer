import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timeInterval: number = 1800; //Default time is 30 Minutes

  ngOnInit 

  formatTime(timeInMs: number): string {
    let seconds = (timeInMs / 1000).toFixed(1);
    let minutes = (timeInMs / (1000 * 60)).toFixed(1);
    return `${minutes} : ${seconds}`;
  }
  constructor() { 
  }

  countDown() 
  {
    this.timeInterval--;
    setInterval(this.countDown, 1000);
  }

  stopTimer()
  {
    clearInterval(this.countDown);
  }
}
