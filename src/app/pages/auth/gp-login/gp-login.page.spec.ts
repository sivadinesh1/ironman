import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpLoginPage } from './gp-login.page';

describe('GpLoginPage', () => {
  let component: GpLoginPage;
  let fixture: ComponentFixture<GpLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
