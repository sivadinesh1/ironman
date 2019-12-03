import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiCalcPage } from './bmi-calc.page';

describe('BmiCalcPage', () => {
  let component: BmiCalcPage;
  let fixture: ComponentFixture<BmiCalcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmiCalcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmiCalcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
