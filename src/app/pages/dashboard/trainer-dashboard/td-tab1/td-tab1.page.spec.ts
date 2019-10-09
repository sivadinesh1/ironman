import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdTab1Page } from './td-tab1.page';

describe('TdTab1Page', () => {
  let component: TdTab1Page;
  let fixture: ComponentFixture<TdTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdTab1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
