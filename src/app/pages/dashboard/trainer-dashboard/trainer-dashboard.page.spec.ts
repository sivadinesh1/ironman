import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDashboardPage } from './trainer-dashboard.page';

describe('TrainerDashboardPage', () => {
  let component: TrainerDashboardPage;
  let fixture: ComponentFixture<TrainerDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
