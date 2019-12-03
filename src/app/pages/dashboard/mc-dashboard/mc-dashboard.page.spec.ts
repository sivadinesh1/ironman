import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McDashboardPage } from './mc-dashboard.page';

describe('McDashboardPage', () => {
  let component: McDashboardPage;
  let fixture: ComponentFixture<McDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
