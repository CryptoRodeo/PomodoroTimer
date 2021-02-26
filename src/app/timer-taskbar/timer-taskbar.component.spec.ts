import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerTaskbarComponent } from './timer-taskbar.component';

describe('TimerTaskbarComponent', () => {
  let component: TimerTaskbarComponent;
  let fixture: ComponentFixture<TimerTaskbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerTaskbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerTaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
