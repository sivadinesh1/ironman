import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDashboardPage } from './member-dashboard.page';

describe('MemberDashboardPage', () => {
  let component: MemberDashboardPage;
  let fixture: ComponentFixture<MemberDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
