import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdTab4Page } from './md-tab4.page';

describe('MdTab4Page', () => {
  let component: MdTab4Page;
  let fixture: ComponentFixture<MdTab4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdTab4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdTab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
