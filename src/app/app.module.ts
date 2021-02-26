import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimerTaskbarComponent } from './timer-taskbar/timer-taskbar.component';
import { TimerDisplayComponent } from './timer-display/timer-display.component';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerTaskbarComponent,
    TimerDisplayComponent,
    TimerControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
