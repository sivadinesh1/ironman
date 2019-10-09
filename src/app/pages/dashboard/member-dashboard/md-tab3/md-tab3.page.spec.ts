import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdTab3Page } from './md-tab3.page';

describe('MdTab3Page', () => {
  let component: MdTab3Page;
  let fixture: ComponentFixture<MdTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdTab3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
