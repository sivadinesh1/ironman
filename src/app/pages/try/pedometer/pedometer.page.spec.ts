import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedometerPage } from './pedometer.page';

describe('PedometerPage', () => {
  let component: PedometerPage;
  let fixture: ComponentFixture<PedometerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedometerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedometerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
