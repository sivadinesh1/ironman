import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmileRatePage } from './smile-rate.page';

describe('SmileRatePage', () => {
  let component: SmileRatePage;
  let fixture: ComponentFixture<SmileRatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmileRatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmileRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
