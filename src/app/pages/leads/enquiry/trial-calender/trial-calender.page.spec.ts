import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialCalenderPage } from './trial-calender.page';

describe('TrialCalenderPage', () => {
  let component: TrialCalenderPage;
  let fixture: ComponentFixture<TrialCalenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialCalenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialCalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
