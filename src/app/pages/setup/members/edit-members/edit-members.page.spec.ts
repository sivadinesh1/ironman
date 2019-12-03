import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMembersPage } from './edit-members.page';

describe('EditMembersPage', () => {
  let component: EditMembersPage;
  let fixture: ComponentFixture<EditMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMembersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
