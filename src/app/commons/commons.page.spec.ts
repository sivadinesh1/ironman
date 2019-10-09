import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonsPage } from './commons.page';

describe('CommonsPage', () => {
  let component: CommonsPage;
  let fixture: ComponentFixture<CommonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
