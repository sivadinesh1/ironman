import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarPage } from './event-calendar.page';

describe('EventCalenderPage', () => {
  let component: EventCalenderPage;
  let fixture: ComponentFixture<EventCalenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
