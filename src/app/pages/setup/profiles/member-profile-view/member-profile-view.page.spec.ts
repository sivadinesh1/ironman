import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileViewPage } from './member-profile-view.page';

describe('MemberProfileViewPage', () => {
  let component: MemberProfileViewPage;
  let fixture: ComponentFixture<MemberProfileViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProfileViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
