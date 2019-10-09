import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdTab1Page } from './md-tab1.page';

describe('MdTab1Page', () => {
  let component: MdTab1Page;
  let fixture: ComponentFixture<MdTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdTab1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
