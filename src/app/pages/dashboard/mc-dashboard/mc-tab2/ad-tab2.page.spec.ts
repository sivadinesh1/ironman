import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTab2Page } from './mc-tab2.page';

describe('AdTab2Page', () => {
  let component: AdTab2Page;
  let fixture: ComponentFixture<AdTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdTab2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
