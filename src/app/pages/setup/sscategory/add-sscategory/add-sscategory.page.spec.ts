import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSscategoryPage } from './add-sscategory.page';

describe('AddSscategoryPage', () => {
  let component: AddSscategoryPage;
  let fixture: ComponentFixture<AddSscategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSscategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSscategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
