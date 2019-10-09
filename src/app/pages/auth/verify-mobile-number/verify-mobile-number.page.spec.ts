import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMobileNumberPage } from './verify-mobile-number.page';

describe('VerifyMobileNumberPage', () => {
  let component: VerifyMobileNumberPage;
  let fixture: ComponentFixture<VerifyMobileNumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyMobileNumberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyMobileNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
