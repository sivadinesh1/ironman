import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTab3Page } from './ad-tab3.page';

describe('AdTab3Page', () => {
  let component: AdTab3Page;
  let fixture: ComponentFixture<AdTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdTab3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
