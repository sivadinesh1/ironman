import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdTab2Page } from './md-tab2.page';

describe('MdTab2Page', () => {
  let component: MdTab2Page;
  let fixture: ComponentFixture<MdTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdTab2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
