import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMembersPage } from './list-members.page';

describe('ListMembersPage', () => {
  let component: ListMembersPage;
  let fixture: ComponentFixture<ListMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMembersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
