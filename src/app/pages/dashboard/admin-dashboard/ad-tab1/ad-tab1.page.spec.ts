import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTab1Page } from './ad-tab1.page';

describe('AdTab1Page', () => {
  let component: AdTab1Page;
  let fixture: ComponentFixture<AdTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdTab1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
