import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTab4Page } from './mc-tab4.page';

describe('AdTab4Page', () => {
  let component: AdTab4Page;
  let fixture: ComponentFixture<AdTab4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdTab4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdTab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
