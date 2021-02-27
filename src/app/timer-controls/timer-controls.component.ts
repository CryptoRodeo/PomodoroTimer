import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'timer-controls',
  templateUrl: './timer-controls.component.html',
  styleUrls: ['./timer-controls.component.css']
})
export class TimerControlsComponent implements OnInit {

  constructor(private timerService: TimerService) { }

  ngOnInit(): void {
  }

  startTimer() {
    this.timerService.startTimer();
  }

  stopTimer() {
    this.timerService.stopTimer();
  }

  resetTimer()
  {
    this.timerService.resetTimer();
  }

}
