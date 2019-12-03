import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateListPage } from './animate-list.page';

describe('AnimateListPage', () => {
  let component: AnimateListPage;
  let fixture: ComponentFixture<AnimateListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
