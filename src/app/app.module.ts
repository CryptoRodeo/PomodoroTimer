import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimerTaskbarComponent } from './timer-taskbar/timer-taskbar.component';
import { TimerDisplayComponent } from './timer-display/timer-display.component';
import { TimerControlsComponent } from './timer-controls/timer-controls.component';
import { InfoComponent } from './info/info.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerTaskbarComponent,
    TimerDisplayComponent,
    TimerControlsComponent,
    InfoComponent,
    SettingsPageComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
