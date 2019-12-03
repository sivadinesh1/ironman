import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMgmtPage } from './contact-mgmt.page';

describe('ContactMgmtPage', () => {
  let component: ContactMgmtPage;
  let fixture: ComponentFixture<ContactMgmtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMgmtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMgmtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
